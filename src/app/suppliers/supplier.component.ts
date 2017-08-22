import {Component, OnInit} from '@angular/core';
import {ApiServices} from '../services/api.services';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {FormGroup, FormControl} from '@angular/forms';

@Component({
  templateUrl: 'supplier.component.html'
})

export class SupplierComponent implements OnInit {
  public id: number;
  public supplier: any;
  public supplierForm = new FormGroup({
    company: new FormControl(),
    adress: new FormControl(),
    city: new FormControl('Seçiniz'),
    town: new FormControl('Seçiniz'),
    phone: new FormControl(),
    email: new FormControl(),
    name: new FormControl(),
    lastname: new FormControl(),
    created_date: new FormControl(),
    updated_date: new FormControl(),
  })
  constructor(private api: ApiServices, private route: ActivatedRoute, private toastr: ToastrService, private routes: Router) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.id = params['id'];
        this.supplier = this.api.get('suppliers/' + this.id).subscribe(p => this.supplierForm.patchValue(p));
      }
    })
  }
  onSubmit(): void {
    if (this.id) {
      this.api.put('suppliers/' + this.id, this.supplierForm.value).subscribe(() => {
        setTimeout(() => this.toastr.success('Tedarikçi kaydı güncellendi.'));
        setTimeout(() => this.routes.navigateByUrl('suppliers/list'), 1000);
      });
    } else {
      this.api.post('suppliers', this.supplierForm.value).subscribe(() => {
        setTimeout(() => this.toastr.success('Tedarikçi kaydı oluşturuldu.'));
        setTimeout(() => this.routes.navigateByUrl('suppliers/list'), 1000);
      });
    }
  }
  onDelete(): void {
    this.api.delete('suppliers/' + this.id)
      .subscribe(r => {
        setTimeout(() => this.toastr.success('Tedarikçi kaydı silindi.'));
        setTimeout(() => this.routes.navigateByUrl('suppliers/list'), 2000);
      })
  }
}
