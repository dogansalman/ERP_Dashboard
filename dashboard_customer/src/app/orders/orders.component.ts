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
  public operations = [];
  public modalRef: BsModalRef;
  public orderId = 0;
  public maxProductionLimit = 0;

  /*
  Production form/
   */
  public productionForm: FormGroup;


  constructor(private api: ApiServices, private modalService: BsModalService, private toastr: ToastrService, private formBuilder: FormBuilder, private router: Router, private _sanitizer: DomSanitizer) { }

  ngOnInit(): void {

    /*
    Get orders
     */
    this.api.get('customer/orders').subscribe(o => this.orderList = o);

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
      'order_id': [this.orderId, Validators.required],
      'updated_date': [],
      'created_date': [],
      'production_personnels': this.formBuilder.array([

      ])
    });

  }





  /*
  Open modal
 */
  public openModal(template: TemplateRef<any>, order) {
    this.selectedOrder = order;
    this.orderId = order.order.id;
    this.maxProductionLimit = (order.order_stock.order_unit - (order.order_stock.produced_orderstock + order.produced_unit)) >= order.stockcard.unit ? order.stockcard.unit : (order.order_stock.order_unit - (order.order_stock.produced_orderstock + order.produced_unit))

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
