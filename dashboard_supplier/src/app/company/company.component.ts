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
  public supplier: any;

  /*
  Customer form group
   */
  public supplierForm: FormGroup;



  constructor( private api: ApiServices, private route: ActivatedRoute, private toastr: ToastrService, private routes: Router, private formBuilder: FormBuilder) {
    /*
    Customer form validation
     */
    this.supplierForm = this.formBuilder.group({
      'company': [null, Validators.required],
      'adress': ['', Validators.required],
      'email': [null, Validators.email],
      'phone': [null, Validators.required],
      'name': [null, Validators.required],
      'lastname': [null, Validators.required],
      'city': [null, Validators.required],
      'town': [null, Validators.required],
      'created_date': [],
      'updated_date': [],
    })
  }

  ngOnInit(): void {

    /*
    Get customer
     */
    this.supplier = this.api.get('supplier/company').subscribe(c => this.supplierForm.patchValue(c));

  }


  /*
Submit form add or update
 */
  onSubmit() {
    console.log(this.supplierForm.value);

    this.api.put('supplier/company', this.supplierForm.value).subscribe(() => {
      setTimeout(() => this.toastr.success('Güncelleme başarılı.'));
    });
  }


}
