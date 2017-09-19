import {Component, OnInit, TemplateRef} from '@angular/core';
import { ApiServices } from '../services/api.services';
import { DatePipe } from '@angular/common';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  templateUrl: 'requistions.component.html'
})

export class RequistionsComponent implements  OnInit {

  public supplyRequistions = [];
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
  /*
 Stock request form
  */
  public requistionsForm: FormGroup;

  constructor(private api: ApiServices, private formBuilder: FormBuilder, private modalService: BsModalService, private toastr: ToastrService) {

    this.requistionsForm = formBuilder.group({
      'real_unit': [Validators.required],
      'waybill': [null, Validators.required],
      'state': [Validators.required],
      'stockcard_id': [],
      'supplier': [],
      'delivery_date': [],
  })
  }

  ngOnInit(): void {
    this.api.get('supply/request').subscribe(s => this.supplyRequistions = s);
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
    this.api.put('supply/request/' + id, this.selectedRequstions).subscribe( () => {
      this.modalRef.hide();
      setTimeout(() => this.toastr.success('Sipariş talebinin durumu güncellendi'));
    });

  }
}
