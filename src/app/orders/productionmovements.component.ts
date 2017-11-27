import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ApiServices} from '../services/api.services';
import {DatePipe} from '@angular/common';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import {ToastrService} from 'ngx-toastr';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import * as moment from 'moment';
import { NguiAutoCompleteDirective } from '@ngui/auto-complete';
import { ExcelServices } from '../services/excel.services';
import { WaybillComponent } from '../shared/components/waybill/waybill.component';
import {BsDatepickerConfig} from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/bs-moment';
import { tr } from '../shared/configs/tr';



@Component({
  templateUrl: 'productionmovements.component.html'
})


export class ProductionmovementsComponent implements OnInit {

  bsConfig: Partial<BsDatepickerConfig>;
  bsConfig2: Partial<BsDatepickerConfig>;

  @ViewChild(NguiAutoCompleteDirective) vc: NguiAutoCompleteDirective;
  public lockWaybill = true;
  public productionList = [];
  public productionForm: FormGroup;
  public personnelList = [];
  public selectedProdStockMovements = [];
  public machines = [];
  public operations = [];
  public selectedOrder;
  public selectedCustomer = {};
  public selectedtabIndex = -1;
  public selectedStockMovement = {};
  public selectedProductionId;
  public selectedProduction;
  public totalSelectedStockMovementUnit = 0;
  public stockMovementForm: FormGroup;
  public waybillForm: FormGroup;
  public modalRef: BsModalRef;
  public waybillModalRef: BsModalRef;
  public openedWaybillModal = false;
  public maxProductionLimit = 0;

  constructor(private api: ApiServices, private modalService: BsModalService, private toastr: ToastrService, private formBuilder: FormBuilder, private router: Router,
              private _sanitizer: DomSanitizer, private route: ActivatedRoute, private excelSer: ExcelServices, private waybill: WaybillComponent ) {
  }

  ngOnInit(): void {

    defineLocale('tr', tr);
    this.bsConfig = Object.assign({}, { locale: 'tr', containerClass: 'theme-blue zindex-inmodal'});
    this.bsConfig2 = Object.assign({}, { locale: 'tr', containerClass: 'theme-blue zindex-inmodal'});

    /*
    Get productions
     */
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.api.get('productions/' + params['id']).subscribe(p => this.productionList = p);
      }
    });


    /*
    Get personnels
    */
    this.api.get('personnel').subscribe(p => {
      this.personnelList = p.map(pp => pp.Personnel);
    });
    /*
    Get machines
   */
    this.api.get('machines').subscribe(m => this.machines = m);
    /*
    Get operation
    */
    this.api.get('operations').subscribe(o => this.operations = o);

    /*
      Production form validation
      */
    this.productionForm = this.formBuilder.group({
      'name': ['', Validators.required],
      'description': [null, Validators.required],
      'is_complate': [false],
      'is_cancel': [false],
      'unit': [0, Validators.required],
      'start_time': ['Seçiniz', Validators.required],
      'end_time': ['Seçiniz', Validators.required],
      'order_id': [null, Validators.required],
      'updated_date': [],
      'created_date': [],
      'production_personnels': this.formBuilder.array([this.initProductionPersonnel()
      ])
    });
    /*
    Stock movement form
     */
    this.stockMovementForm = this.formBuilder.group({
      'unit': [null, Validators.required],
      'junk': [null],
      'supplier': [null, Validators.required],
      'waybill': [null, Validators.required]
    })
    /*
    Waybill form
     */
    this.waybillForm = this.formBuilder.group({
    'waybill_no': [null, Validators.required],
    'edit_date': [null, Validators.required],
    'send_date': [null, Validators.required],
    'invoice_date': [null, Validators.required],
    })
  }

  /*
  Autocomplate Setting
   */
  autocompleListFormatter = (data: any): SafeHtml => {
    const html = `<span>${data.name} ${data.lastname} </span>`;
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }

  ValueFormatter(data: any): string {
    return `${data.name} ${data.lastname}`;
  }

  OperationMachineValueFormatter(data: any): string {
    return `${data.name}`;
  }

  autocompleMachineOperationListFormatter = (data: any): SafeHtml => {
    const html = `<span>${data.name}</span>`;
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }

  /*
  Init Production Personel
 */
  initProductionPersonnel() {
    return this.formBuilder.group({
      personnel: [null, Validators.required],
      operations: this.formBuilder.array([this.initPersonnelOperation()])


    });
  }

  /*
  Init Production Operation
 */
  initPersonnelOperation(): FormGroup {
    return this.formBuilder.group({
      machine: ['', Validators.required],
      operation: ['', Validators.required],
      operation_time: ['', Validators.required]
    });
  }

  onPersonnelChange(sc, el): void {
    el.disabled = true;
  }

  /*
  Operation times
  * */
  operationTotalMilSeconds(): any {
    let totaltime = 0;
    this.productionForm.value.production_personnels.map(a => a.operations).forEach(a => a.forEach(b => totaltime += parseInt(b.operation_time)))
    const operationTime = moment.duration(totaltime * this.productionForm.value.unit, 'minutes');
    return operationTime.as('milliseconds');
  }

  operationTime(): any {
    let totaltime = 0;
    this.productionForm.value.production_personnels.map(a => a.operations).forEach(a => a.forEach(b => totaltime += parseInt(b.operation_time)))
    return moment.utc(totaltime * 60000).format('HH:mm:ss');
  }

  operationTotalTime(): any {
    if (this.operationTotalMilSeconds() > 84400000) {
      return '24:00 ve üzeri';
    }
    return moment.utc(this.operationTotalMilSeconds()).format('HH:mm:ss');
  }

  operationWorkTime(): any {
    const startTime = moment(this.productionForm.value.start_time, 'HH:mm:ss a');
    const endTime = moment(this.productionForm.value.end_time, 'HH:mm:ss a');
    const duration = moment.duration(endTime.diff(startTime));
    return moment.utc(duration.as('milliseconds')).format('HH:mm:ss');
  }

  operationTimeValidate(): any {
    const workTime = moment(this.operationWorkTime(), 'HH:mm:ss a');
    const totalOperationTime = moment(this.operationTotalTime(), 'HH:mm:ss a');
    if (this.operationTotalMilSeconds() > 84400000 || (workTime.unix() - totalOperationTime.unix()) < 0) return false;
    return true;
  }

  /*
 Remove personnel control
  */
  removePersonnelControl(i: number) {
    const control = this.productionForm.get('production_personnels') as FormArray;
    control.removeAt(i);
  }

  /*
  Add personnel control
   */
  addPersonnelControl() {
    const control = this.productionForm.get('production_personnels') as FormArray;
    control.push(this.initProductionPersonnel());
  }

  /*
  Add operation control
   */
  addOperationControl(index) {
    ;
    const arr: FormArray = this.productionForm.get(`production_personnels.${index}.operations`) as FormArray;
    arr.push(this.initPersonnelOperation());
  }


  /*
  Open production modal
 */
  public productionModal(template: TemplateRef<any>, production) {

    this.selectedProduction = production;
    let total = 0;


    // get order
    this.api.get('orders/' + production.order.id).subscribe(o => {
      this.selectedOrder = o;
      // get total production unit
      this.productionList.forEach(p => {
        if(!p.production.is_cancel && !p.production.is_complate && p.production.id != production.production.id) total = total + p.production.unit
        });
        this.maxProductionLimit = (o.order_stocks.order_unit - (o.order_stocks.produced_orderstock + total)) >= o.order_stocks.order_stock.unit ? o.order_stocks.order_stock.unit : (o.order_stocks.order_unit - (o.order_stocks.produced_orderstock + total));
      });

    // get customer
    this.api.get('customers/' + production.order.customer_id).subscribe(c => this.selectedCustomer = c);

    // get production stock movement
    this.api.get('productions/dispatch/' + production.production.id).subscribe(sm => {
      this.selectedProdStockMovements = sm;
      sm.forEach(smm => this.totalSelectedStockMovementUnit += (smm.is_junk ? 0 : smm.unit));
    });

    // get production detail
    this.api.get('productions/detail/' + production.production.id).subscribe(p => {
      this.productionForm.patchValue(p);
      this.selectedProductionId = production.production.id;

      const production_personnels = <FormArray>this.productionForm.controls['production_personnels'];

      /*
      Clear production personnels
       */
      production_personnels.controls.splice(0, production_personnels.controls.length);

      /*
      Append personnel with operation
       */
      p.production_personnels.forEach(pp => {
        const personnels = this.formBuilder.group({
          personnel: pp.personnel,
          operations: this.formBuilder.array([])
        });
        const operations = personnels.get('operations') as FormArray;
        pp.operations.forEach(op => {

          operations.push(this.formBuilder.group({
            machine: op.machine,
            operation: op.operation,
            operation_time: op.operation_time
          }));

        });
        production_personnels.push(personnels);

      });

      /*
      Open modal
       */
      this.modalRef = this.modalService.show(template, {
        keyboard: false,
        ignoreBackdropClick: true,
        class: 'gray modal-lg'
      });

      // console.log(this.selectedCustomer);
       //console.log(this.selectedProduction);
       //console.log(this.selectedOrder);
       //console.log(this.productionList);
       //console.log(this.selectedProdStockMovements);
    });

    /*
    Modal closing
     */
    this.modalService.onHide.subscribe((reason: string) => {
      this.productionForm.reset();
      this.waybillForm.reset();
      this.lockWaybill = true;
    });
  }
  /*
  Open waybill modal
   */
  printWaybillModal(template: TemplateRef<any>, selectedStockMovement): void {
    this.selectedStockMovement = selectedStockMovement;

    this.waybillForm.patchValue({waybill_no: selectedStockMovement.waybill });
    this.waybillModalRef = this.modalService.show(template, {
      keyboard: false,
      ignoreBackdropClick: true,
      class: 'gray modal-md'
    });
  }

  /*
  Print Waybill
   */
  OnPrint(): void {
    if (!this.lockWaybill) {
      this.api.put('stockmovements/', Object.assign(this.selectedStockMovement, {waybill: this.waybillForm.value.waybill_no })).subscribe(() => {
        Object.assign(this.selectedProdStockMovements.find(sm => sm === this.selectedStockMovement),this.selectedStockMovement );
      });
    }
    this.waybill.print(Object.assign(this.waybillForm.value, this.selectedCustomer));
  }
  /*
  create or update order
 */
  onSubmit(): void {
    const productionData = this.productionForm.value;
    delete productionData['created_date'];
    delete productionData['updated_date'];
    Object.assign(this.productionList.find(p => p.production.id == 3042).production, {unit: productionData.unit });
    this.api.put('productions/' + this.selectedProductionId, productionData).subscribe(() => {
      this.modalRef.hide();
      setTimeout(() => this.toastr.success('Üretim kaydı güncellendi.'));
    });
  }

  /*
  Unclock Waybill Input
   */
  toggleLockWaybill(a): void {
    this.lockWaybill = (this.lockWaybill === true ? null : true);
  }
  /*
  Add Stock Movement
   */
  addstockMovementForm(production_id): void {
    const movementDispatchData = this.stockMovementForm.value;

    this.selectedProduction.production.produced_unit = (parseInt(this.selectedProduction.production.produced_unit) + parseInt(movementDispatchData.unit));

    if (this.selectedProduction.production.produced_unit >= this.selectedProduction.production.unit) {
      this.selectedProduction.production.is_complate = true;
      this.selectedProduction.production.is_production = false;
    }

    Object.assign(this.stockMovementForm.value, {junk: this.stockMovementForm.value.junk ? this.stockMovementForm.value.junk : 0 });
     this.api.post('productions/dispatch/' + this.selectedProductionId, this.stockMovementForm.value).subscribe(() => {
      this.modalRef.hide();
     setTimeout(() => this.toastr.success('Sevk kaydı oluşturuldu.'));
    })
  }

  /*
  On selected tab
   */
  onTabSelect(index): void {
    this.selectedtabIndex  = index;
  }
  minProductionDateValidate(event): void {
    if (event.target.value < this.totalSelectedStockMovementUnit) event.target.value = 10;
  }

  /*
  Save as excel
   */
  saveAsExcel(): void {
    this.excelSer.exportAsExcelFile(this.productionList , 'Uretim_Hareket_Listesi');
  }

}

