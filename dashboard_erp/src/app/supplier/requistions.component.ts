import {Component, OnInit, TemplateRef} from '@angular/core';
import { ApiServices } from '../services/api.services';
import { DatePipe } from '@angular/common';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MultiFilterPipe } from '../shared/pipes/multi-filter/multi-filter.pipe';
import { ExcelServices } from '../services/excel.services';

@Component({
  templateUrl: 'requistions.component.html'
})

export class RequistionsComponent implements  OnInit {

  public supplyRequistions = [];
  public filteredSupplyRequistions = null;
  public selectedRequstions = [];
  public modalRef: BsModalRef;
  public tableIconSet = {
    '0':
      {
        'icon': 'icon-clock icons',
        'class': 'badge badge-danger',
        'text': 'Bekleniyor'
      }
    ,
    '1':
      {
        'icon': 'fa fa-check',
        'class': 'badge badge-success',
        'text': 'Teslim'
      }
    ,
    '2':
      {
        'icon': 'fa fa-close',
        'class': 'badge badge-danger',
        'text': 'İptal'
      }
  };
  public isCancel;

  public selectedSupplier = null;
  public searchTerm = null;
  public state = null;

  public deliveryStock = 0;
  public expectedStock = 0;
  public reverseStock = 0;

  public requistionsFilter = {};

  /*
 Stock request form
  */
  public requistionsForm: FormGroup;

  constructor(private api: ApiServices, private formBuilder: FormBuilder, private modalService: BsModalService, private toastr: ToastrService, private excelSer: ExcelServices) {

    this.requistionsForm = formBuilder.group({
      'real_unit': [Validators.required],
      'waybill': [null, Validators.required],
      'state': [Validators.required],
      'stockcard_id': [],
      'supplier': [],
      'delivery_date': [],
      'supplier_id': []
  })
  }

  ngOnInit(): void {
    this.api.get('supply/request').subscribe(s => {
      this.supplyRequistions = s;
      this.supplyRequistions.forEach(i =>  {
        i = Object.assign(i, i.SupplyRequisitions)
        delete i.SupplyRequisitions
      })
      this.setStatics(this.supplyRequistions);
    });
  }

  /*
Open modal
 */
  public openModal(template: TemplateRef<any>, requstions) {
    this.selectedRequstions = Object.assign(requstions, requstions.SupplyRequisitions);
    this.requistionsForm.patchValue(this.selectedRequstions);
    this.modalRef = this.modalService.show(template, {keyboard: false, ignoreBackdropClick: true});

  }

  onStateChange(state): void {
   this.isCancel = state === '2' ? true : false;
  }

/*
Send
 */
  public send(id: any) {
      this.api.put('supply/request/' + id, this.requistionsForm.value).subscribe( () => {
      this.modalRef.hide();
       setTimeout(() => this.toastr.success('Sipariş talebinin durumu güncellendi'));
        Object.assign(this.supplyRequistions.find(sr => sr.id === id), {state: this.requistionsForm.value.state, real_unit: this.requistionsForm.value.real_unit });
    });
  }

  onChangeSupplier(supplier): void {
   this.selectedSupplier = supplier === 'Tedarikçi' ? null : supplier;
  }

  onChangeState(_state): void {
    this.state = _state === 'Durum' ? null : _state.toString();
  }

  onChangeSearchTerm(searchText): void {
    this.searchTerm = searchText === '' ? null : searchText.toLowerCase();
  }

  filter(): void {
    if (this.selectedSupplier) {
      Object.assign(this.requistionsFilter, {'supplier': this.selectedSupplier})
    } else {
      delete this.requistionsFilter['supplier'];
    }
    if (this.searchTerm) {
      Object.assign(this.requistionsFilter, {'stockcard_code': this.searchTerm})
    } else {
      delete this.requistionsFilter['stockcard_code'];
    }
    if (this.state) {
      Object.assign(this.requistionsFilter, {'state': this.state})
    } else {
      delete this.requistionsFilter['state'];
    }
    this.filteredSupplyRequistions = new MultiFilterPipe().transform(this.supplyRequistions, this.requistionsFilter);
    this.setStatics(this.filteredSupplyRequistions);
  }

  cleanStatic(): void {
    this.deliveryStock = 0;
    this.expectedStock = 0;
    this.reverseStock = 0;
  }

  setStatics(items): void {
    this.cleanStatic();
    items.filter(i => i.state === 1).forEach(i => this.deliveryStock += Number(i.real_unit));
    items.filter(i => i.state === 0).forEach(i => this.expectedStock +=  Number(i.unit));
    items.filter(i => i.state === 2).forEach(i => this.reverseStock +=  Number(i.unit));
  }

  excel(): void {
    this.excelSer.exportAsExcelFile(this.filteredSupplyRequistions || this.supplyRequistions , 'cikti');
  }
}
