import {Component, OnInit, TemplateRef} from '@angular/core';
import {ApiServices} from '../services/api.services';
import { BsModalService } from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/modal-options.class';
import {FormGroup, Validators, FormBuilder, AbstractControl, ValidatorFn} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs/Subscription';
import { ConditionalValidate } from '../shared/validations/conditional-validate';
import { Router} from '@angular/router'
@Component({
  templateUrl: 'stockcards.component.html'
})

export class StockcardsComponent implements  OnInit {
  /*
  Stock card list
   */
  public stockCardList = [];

  /*
  Selected stock card
   */
  public selectedStockCard = {};

  /*
  Ngx modal component
   */
  public modalRef: BsModalRef;
  public subscriptions: Subscription[] = [];

  /*
  Is add stock
   */
  public isAdd: boolean;

  /*
  Stock change form/
   */
  public stockChangeForm: FormGroup;


  hasExclamationMark(condition: (() => boolean), validator: ValidatorFn): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      if (! condition()) {
        return null;
      }
      console.log(validator(control));
      return validator(control);
    }
  }

  /*
  Stock change modal from group validation
   */

  constructor(private api: ApiServices, private modalService: BsModalService, private toastr: ToastrService, private formBuilder: FormBuilder, private router: Router) {

    /*
    Stock change form validations
     */
    this.stockChangeForm = formBuilder.group({
      'unit' : [null, Validators.required],
      'waybill': [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(255)])],
      'not': [null],
      'supplier': ['Seçiniz', [Validators.required, ConditionalValidate('Seçiniz')]]
    })
  }

  ngOnInit(): void {
    /*
    Get stock cards
     */
    this.api.get('stockcards').subscribe(s => this.stockCardList = s);

  }

  /*
  Open modal
   */
  public openModal(template: TemplateRef<any>, stockcard, add) {
    this.selectedStockCard = stockcard;
    this.isAdd = add;
    this.modalRef = this.modalService.show(template, {keyboard: false, ignoreBackdropClick: true});

    /*
    Modal closing
     */
    this.modalService.onHide.subscribe((reason: string) => {
      this.stockChangeForm.reset();
    });
  }

  /*
  Change stocks
   */
  changeStock(id): void {
   if (!id) { return; }
    const stockMovemenet = Object.assign(this.stockChangeForm.value, {stockcard_id : id});
   if (this.isAdd) {
     this.api.post('stockmovements/add/' + id, stockMovemenet).subscribe( () => {
       this.stockCardList.find((sc) => sc.id === id).unit += stockMovemenet.unit;
       this.modalRef.hide();
       setTimeout(() => this.toastr.success(stockMovemenet.unit + ' adet stok eklendi.'));
     });
   } else {
     this.api.put('stockmovements/remove/' + id, stockMovemenet).subscribe( () => {
      this.stockCardList.find((sc) => sc.id === id).unit -= stockMovemenet.unit;
       this.modalRef.hide();
       setTimeout(() => this.toastr.success(stockMovemenet.unit + ' adet stok çıkartıldı.'));
     });
   }
  }

  /*
  Navigate detail
   */
  navigateDetail(event, id): void {
    if (!event.target.closest('.btn')) {
      this.router.navigateByUrl('stockcards/edit/' + id);
    }
  }

}
