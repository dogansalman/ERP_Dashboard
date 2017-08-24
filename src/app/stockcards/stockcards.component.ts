import {Component, OnInit, TemplateRef } from '@angular/core';
import {ApiServices} from '../services/api.services';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import {FormGroup, FormControl} from '@angular/forms';

@Component({
  templateUrl: 'stockcards.component.html'
})

export class StockcardsComponent implements  OnInit {

  public stockCardList = [];
  public selectedStockCard = {};
  public modalRef: BsModalRef;

  public stockCardAddForm = new FormGroup({
    unit: new FormControl(),
    waybill: new FormControl(),
    not: new FormControl(),
    suppliers: new FormControl('Seçiniz')
  })

  constructor(private api: ApiServices, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.api.get('stockcards').subscribe(s => this.stockCardList = s);
  }

  public openModal(template: TemplateRef<any>, stockcard) {
    this.selectedStockCard = stockcard;
    this.modalRef = this.modalService.show(template, {keyboard: false, ignoreBackdropClick: true});
  }
  addStock(): void {
  }


}
