import {Component, OnInit} from '@angular/core';
import {ApiServices} from '../services/api.services';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ConditionalValidate } from '../shared/validations/conditional-validate';

@Component({
  templateUrl: 'customer.component.html'
})

export class CustomerComponent  implements OnInit {

  /*
  Selecred customer id
   */
  public id: number;
  /*
  Customer detail
   */
  public customer: any;

  /*
  Customer form group
   */
  public customerForm: FormGroup;



  constructor( private api: ApiServices, private route: ActivatedRoute, private toastr: ToastrService, private routes: Router, private formBuilder: FormBuilder) {
    /*
    Customer form validation
     */
    this.customerForm = this.formBuilder.group({
      'company': [null, Validators.required],
      'adress': ['', Validators.required],
      'city': ['Seçiniz', [Validators.required, ConditionalValidate('Seçiniz')]],
      'town': ['Seçiniz', [Validators.required, ConditionalValidate('Seçiniz')]],
      'email': [null, Validators.email],
      'phone': [null, Validators.required],
      'name': [null, Validators.required],
      'lastname': [null, Validators.required],
      'password': [null, Validators.required],
      'state': [false, Validators.required],
      'tax_name': [],
      'tax_number': [],
      'created_date': [],
      'updated_date': [],
    })
  }

  ngOnInit(): void {

    /*
    Get customer
     */
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.id = +params['id'];
        this.customer = this.api.get('customers/' + this.id).subscribe(c => this.customerForm.patchValue(c));
      }
    });
  }
/*
Active/pasive checkbox selected change
 */
  onCheckboxChange(event) {
    if (this.customerForm.get(event.target.id)) {
      this.customerForm.patchValue({state: event.target.checked ? true : false});
    }
  }

  /*
Submit form add or update
 */
  onSubmit() {
    if (this.id) {
      this.api.put('customers/' + this.id, this.customerForm.value).subscribe(() => {
        setTimeout(() => this.toastr.success('Müşteri kaydı güncellendi.'));
        setTimeout(() => this.routes.navigateByUrl('customers/list'), 1000);
      });
    } else {
      delete this.customerForm.value['created_date']
      this.api.post('customers', this.customerForm.value).subscribe(() => {
        setTimeout(() => this.toastr.success('Müşteri kaydı oluşturuldu.'));
        setTimeout(() => this.routes.navigateByUrl('customers/list'), 1000);
      });
    }
  }

 /*
 Delete customer
  */
  onDelete(): void {
    this.api.delete('customers/' + this.id)
      .subscribe(r => {
        setTimeout(() => this.toastr.success('Müşteri kaydı silindi.'));
        setTimeout(() => this.routes.navigateByUrl('customers/list'), 2000);
      })
  }
}
