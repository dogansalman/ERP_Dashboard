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
  public orderId = 0;


  /*
  Production form/
   */
  public productionForm: FormGroup;


  constructor(private api: ApiServices, private modalService: BsModalService, private toastr: ToastrService, private formBuilder: FormBuilder, private router: Router, private _sanitizer: DomSanitizer) { }

  ngOnInit(): void {

    /*
    Get orders
     */
    this.api.get('supplier/requisitions').subscribe(o => this.orderList = o);
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
