import {Component, OnInit} from '@angular/core';
import {ApiServices} from '../services/api.services';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ConditionalValidate } from '../shared/validations/conditional-validate';

@Component({
  templateUrl: 'company.component.html'
})

export class CompanyComponent  implements OnInit {

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
      'email': [null, Validators.email],
      'phone': [null, Validators.required],
      'name': [null, Validators.required],
      'lastname': [null, Validators.required],
      'created_date': [],
      'updated_date': [],
    })
  }

  ngOnInit(): void {

    /*
    Get customer
     */
    this.customer = this.api.get('supplier/company').subscribe(c => this.customerForm.patchValue(c));
    console.log(this.customerForm.value);
  }


  /*
Submit form add or update
 */
  onSubmit() {
    this.api.put('customer/company', this.customerForm.value).subscribe(() => {
      setTimeout(() => this.toastr.success('Update Successfully.'));
    });
  }


}
