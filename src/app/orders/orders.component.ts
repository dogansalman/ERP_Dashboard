import {Component, OnInit, TemplateRef} from '@angular/core';
import {ApiServices} from '../services/api.services';
import {DatePipe} from '@angular/common';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import {ToastrService} from 'ngx-toastr';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import * as moment from 'moment';

@Component({
  templateUrl: 'orders.component.html'
})

  export class OrdersComponent implements  OnInit {
  public orderList = [];
  public personnelList = [];
  public selectedOrder = {};
  public machines = [];
  public operations = [];
  public modalRef: BsModalRef;
  public operationValidate = true;
  public orderStock = {};
  /*
  Production form/
   */
  public productionForm: FormGroup;


  constructor(private api: ApiServices, private modalService: BsModalService, private toastr: ToastrService, private formBuilder: FormBuilder, private router: Router, private _sanitizer: DomSanitizer) { }

  ngOnInit(): void {

    /*
    Get orders
     */
    this.api.get('orders').subscribe(o => this.orderList = o);
    /*
    Get personnels
   */
    this.api.get('personnel').subscribe(p => {
      this.personnelList = p.map(pp =>  pp.Personnel);
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
      'updated_date': [],
      'created_date': [],
      'production_personnels': this.formBuilder.array([
        this.initProductionPersonnel()
      ])
    });

  }

  /*
  Order stock state
   */
  orderStockState(order: any): any {
  return 'width:' + ((order.order_stock.produced_orderstock / order.order_stock.order_unit) * 100).toString() + '%';
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
      operations: this.formBuilder.array([
        this.initPersonnelOperation()
      ])
    });
  }

  /*
  Init Production Operation
 */
  initPersonnelOperation() {
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
    this.productionForm.value.production_personnels.map(a => a.operations).forEach(a => a.forEach(b => totaltime += parseInt(b.operation_time)) )
    const operationTime = moment.duration(totaltime * this.productionForm.value.unit, 'minutes');
    return operationTime.as('milliseconds');
  }
  operationTime(): any {
    let totaltime = 0;
    this.productionForm.value.production_personnels.map(a => a.operations).forEach(a => a.forEach(b => totaltime += parseInt(b.operation_time)) )
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
    if (this.operationTotalMilSeconds() > 84400000 || (workTime.unix() - totalOperationTime.unix()) < 0 ) return false;
    return true;
  }

  /*
 Remove personnel control
  */
  removePersonnelControl(i: number) {
    const control = <FormArray>this.productionForm.controls['production_personnels'];
    control.removeAt(i);
  }

  /*
  Add personnel control
   */
  addPersonnelControl() {
    const control = <FormArray>this.productionForm.controls['production_personnels'];
    control.push(this.initProductionPersonnel());
  }
  /*
  Add operation control
   */
  addOperationControl(index) {
    console.log(index);
    const arr: FormArray = this.productionForm.get(`production_personnels.${index}.operations`) as FormArray;
    arr.push(this.initPersonnelOperation());
  }


  /*
  Open modal
 */
  public openModal(template: TemplateRef<any>, order) {
    this.selectedOrder = order;
    this.modalRef = this.modalService.show(template, {keyboard: false, ignoreBackdropClick: true, class: 'gray modal-lg'});
    /*
    Modal closing
     */
    this.modalService.onHide.subscribe((reason: string) => {
      // this.productionForm.reset();
    });
  }

  /*
  create or update order
 */
  onSubmit(): void {
    console.log(this.productionForm.value);
  }
  /*
  Navigate detail
 */
  navigateDetail(event, id): void {
    if (!event.target.closest('.btn')) {
      this.router.navigateByUrl('orders/edit/' + id);
    }
  }

}
