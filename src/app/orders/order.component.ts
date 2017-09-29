import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ApiServices} from '../services/api.services';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ConditionalValidate } from '../shared/validations/conditional-validate';
import {BsDatepickerConfig} from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/bs-moment';
import { tr } from '../shared/configs/tr';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import {SafeHtml, DomSanitizer} from '@angular/platform-browser';


@Component({
  templateUrl: 'order.component.html'
})


export class OrderComponent implements  OnInit {
  bsConfig: Partial<BsDatepickerConfig>;

  items: any[] = [];

  @ViewChild('searchStockCard') searchCardInput: ElementRef;
  /*
  Stock card list
   */
  public stockCardList = [];
  /*
  Selected stock card
   */
  public selectedStockCard = null;
  /*
  Selected stock card list
   */
  public selectedStockCardList = [];
  /*
  Order Validation
   */
  public orderForm: FormGroup;
  /*
  Selecred order id
   */
  public id: number;


  constructor(private api: ApiServices, private route: ActivatedRoute, private toastr: ToastrService, private routes: Router, private formBuilder: FormBuilder, private _sanitizer: DomSanitizer) {

  }


  /*
    create or update order
   */
  onSubmit(): void {
   // console.log(this.orderForm.value);
  }

  autocompleListFormatter = (data: any): SafeHtml => {
    const html = `<span>${data.name} (${data.code}) - <b>Stok:  ${data.unit} </b></span>`;
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }

  initStockCard() {

    return this.formBuilder.group({
      order_stock: ['', Validators.required],
      order_unit: ['', Validators.required]
    });
  }

  onStockCardChange(sc): void {
    this.selectedStockCard = sc;
    this.stockCardList.splice(this.stockCardList.findIndex(scard => scard === sc), 1);
    this.selectedStockCard = null;
  }
  addStockCard() {
    const control = <FormArray>this.orderForm.controls['order_stocks'];
    control.push(this.initStockCard());
  }

  removeStockCard(i: number) {
    const control = <FormArray>this.orderForm.controls['order_stocks'];
    this.stockCardList.push(control.value[i]);
    control.removeAt(i);
  }


  ngOnInit(): void {

    /*
     Order Form Build
      */
    this.orderForm = this.formBuilder.group({
      'customer_id': ['Seçiniz', Validators.required],
      'over_date': [null, Validators.required],
      'order_note': [''],
      'created_date': [''],
      'updated_date': [''],
      'order_stocks': this.formBuilder.array([
        this.initStockCard(),
      ])
    })


    defineLocale('tr', tr)
    /*
    datetime picker config
     */
    this.bsConfig = Object.assign({}, { locale: 'tr', containerClass: 'theme-blue zindex-inmodal'});
    /*
    Get stock cards
     */
    this.api.get('stockcards').subscribe(s => this.stockCardList = s);
  }

}
