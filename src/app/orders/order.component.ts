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
  Order Validation
   */
  public orderForm: FormGroup;
  /*
  Selecred order id
   */
  public id: number;
  /*
  Orders
   */
  public orderDetail  = {is_complated: false, is_production: false};

  constructor(private api: ApiServices, private route: ActivatedRoute, private toastr: ToastrService, private routes: Router, private formBuilder: FormBuilder, private _sanitizer: DomSanitizer) {

  }

  /*
    create or update order
   */
  onSubmit(): void {
    delete this.orderForm.value['created_date'];
      this.api.post('orders', this.orderForm.value).subscribe(() => {
      setTimeout(() => this.toastr.success('Sipariş kaydı oluşturuldu.'));
      setTimeout(() => this.routes.navigateByUrl('orders/list'), 1000)
    })
  }

  autocompleListFormatter = (data: any): SafeHtml => {
    const html = `<span>${data.name} (${data.code}) - <b>Stok:  ${data.unit} </b></span>`;
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }

  onStockCardChange(sc, el): void {
    // el.disabled = true;
  }
  stockCardSelectionClick(sc, el): void {
    console.log(el.getAttribute('disabled'));
  }


  isDisableForm(): any {
    return this.orderDetail.is_complated || this.orderDetail.is_production ? true : null;
  }

  ValueFormatter(data: any): string {
    return `${data.name} ${data.code}`;
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
      'order_stocks': this.formBuilder.group({
        order_stock: [null, Validators.required],
        order_unit: [null, Validators.required]
      }),
    });

    /*
    Get order details
     */
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.id = params['id'];
        this.api.get('orders/' + this.id).subscribe(o =>  {
          this.orderForm.patchValue(o);
          this.orderDetail = o;
        });
      }
    });


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
