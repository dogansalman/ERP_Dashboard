import {Component, OnInit, TemplateRef} from '@angular/core';
import {ApiServices} from '../services/api.services';
import {DatePipe} from '@angular/common';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import {ToastrService} from 'ngx-toastr';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Component({
  templateUrl: 'orders.component.html'
})

  export class OrdersComponent implements  OnInit {
  public orderList = [];
  public personnelList = [];
  public selectedOrder = {};
  public modalRef: BsModalRef;
  /*
  Production form/
   */
  public productionForm: FormGroup;


  constructor(private api: ApiServices, private modalService: BsModalService, private toastr: ToastrService, private formBuilder: FormBuilder, private router: Router, private _sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    /*
    Get orders
     */
    this.api.get('orders').subscribe(s => this.orderList = s);

    /*
    Get personnels
   */
    this.api.get('personnel').subscribe(s => {
      this.personnelList = s.map(a =>  a.Personnel);
  });



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

  autocompleListFormatter = (data: any): SafeHtml => {
    const html = `<span>${data.name} ${data.lastname} </span>`;
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }
  ValueFormatter(data: any): string {
    return `${data.name} ${data.lastname}`;
  }

/*
Inıt Production Personel
 */
  initProductionPersonnel() {
    return this.formBuilder.group({
      personel_id: [null, Validators.required]
    });
  }

  onPersonnelChange(sc, el): void {
    el.disabled = true;
    //console.log(sc);
  }

  addPersonnelControl() {
    const control = <FormArray>this.productionForm.controls['production_personnels'];
    control.push(this.initProductionPersonnel());
  }
  removePersonnelControl(i: number) {
    const control = <FormArray>this.productionForm.controls['production_personnels'];
    control.removeAt(i);

  }
  /*
    create or update order
   */
  onSubmit(): void {
   console.log(this.productionForm.value);
  }

  /*
  Open modal
 */
  public openModal(template: TemplateRef<any>, order) {
    this.selectedOrder = order;
    this.modalRef = this.modalService.show(template, {keyboard: false, ignoreBackdropClick: true, size: 'lg', cssClass: 'deneme'});
    /*
    Modal closing
     */
    this.modalService.onHide.subscribe((reason: string) => {
      //this.productionForm.reset();
    });
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
