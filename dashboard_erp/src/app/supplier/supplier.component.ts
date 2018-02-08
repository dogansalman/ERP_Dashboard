import {Component, OnInit} from '@angular/core';
import {ApiServices} from '../services/api.services';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import {DatePipe} from '@angular/common';
import { ConditionalValidate } from '../shared/validations/conditional-validate';

@Component({
  templateUrl: 'supplier.component.html'
})

export class SupplierComponent implements OnInit {
  /*
  Supplier id
   */
  public id: number;
  /*
  Supplier detail
   */
  public supplier: any;
  public supplierForm: FormGroup;

  constructor(private api: ApiServices, private route: ActivatedRoute, private toastr: ToastrService, private routes: Router, private formBuilder: FormBuilder) {
    this.supplierForm = this.formBuilder.group({
      'company': [null, Validators.required],
      'adress': [null, Validators.required],
      'city': ['Seçiniz', [ Validators.required, ConditionalValidate('Seçiniz') ]],
      'town': ['Seçiniz', [ Validators.required, ConditionalValidate('Seçiniz') ]],
      'phone': [null, Validators.required],
      'email': [],
      'name': [null, Validators.required],
      'lastname': [null, Validators.required],
      'created_date': [],
      'updated_date': [],
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.id = params['id'];
        this.supplier = this.api.get('suppliers/' + this.id).subscribe(p => this.supplierForm.patchValue(p));
      }
    })
  }

  /*
  create or update supplier
   */
  onSubmit(): void {
    if (this.id) {
      this.api.put('suppliers/' + this.id, this.supplierForm.value).subscribe(() => {
        setTimeout(() => this.toastr.success('Tedarikçi kaydı güncellendi.'));
        setTimeout(() => this.routes.navigateByUrl('supplier/list'), 1000);
      });
    } else {
      delete this.supplierForm.value['created_date']
      this.api.post('suppliers', this.supplierForm.value).subscribe(() => {
        setTimeout(() => this.toastr.success('Tedarikçi kaydı oluşturuldu.'));
        setTimeout(() => this.routes.navigateByUrl('supplier/list'), 1000);
      });
    }
  }
  /*
  delete supplier
   */
  onDelete(): void {
    this.api.delete('suppliers/' + this.id)
      .subscribe(r => {
        setTimeout(() => this.toastr.success('Tedarikçi kaydı silindi.'));
        setTimeout(() => this.routes.navigateByUrl('supplier/list'), 2000);
      })
  }
}
