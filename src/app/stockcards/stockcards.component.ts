import {Component, OnInit, TemplateRef } from '@angular/core';
import {ApiServices} from '../services/api.services';
import { BsModalService } from 'ngx-bootstrap/modal';
import {BsModalRef, modalConfigDefaults} from 'ngx-bootstrap/modal/modal-options.class';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  templateUrl: 'stockcards.component.html'
})

export class StockcardsComponent implements  OnInit {

  public stockCardList = [];
  public selectedStockCard = {};
  public modalRef: BsModalRef;
  public isAdd: boolean;
  public stockCardAddForm = new FormGroup({
    unit: new FormControl(),
    waybill: new FormControl(),
    not: new FormControl(),
    supplier: new FormControl('Belirtilmedi')
  })

  constructor(private api: ApiServices, private modalService: BsModalService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.api.get('stockcards').subscribe(s => this.stockCardList = s);
  }

  public openModal(template: TemplateRef<any>, stockcard, add) {
    this.selectedStockCard = stockcard;
    this.isAdd = add;
    this.modalRef = this.modalService.show(template, {keyboard: false, ignoreBackdropClick: true});
  }
  changeStock(id): void {
   if (!id) return;
    const stockMovemenet = Object.assign(this.stockCardAddForm.value, {stockcard_id : id});
   if (this.isAdd) {
     this.api.post('stockmovements/add/' + id, stockMovemenet).subscribe( () => {
       this.stockCardList.find((sc) => sc.id === id).unit += stockMovemenet.unit;
       this.modalRef.hide();
       setTimeout(() => this.toastr.success(stockMovemenet.unit + ' adet stok eklendi.'));
     });
   } else {
     this.api.post('stockmovements/remove/' + id, stockMovemenet).subscribe( () => {
       this.stockCardList.find((sc) => sc.id === id).unit -= stockMovemenet.unit;
       this.modalRef.hide();
       setTimeout(() => this.toastr.success(stockMovemenet.unit + ' adet stok çıkartıldı.'));
     });
   }
  }


}
