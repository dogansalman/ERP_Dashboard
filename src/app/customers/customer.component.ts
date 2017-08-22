import {Component, OnInit} from '@angular/core';
import {ApiServices} from '../services/api.services';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {FormGroup, FormControl} from '@angular/forms';

@Component({
  templateUrl: 'customer.component.html'
})

export class CustomerComponent  implements OnInit {

  public id: number;
  public customer: any;
  public customerForm = new FormGroup({
    company: new FormControl(),
    adress: new FormControl(),
    city: new FormControl('Seçiniz'),
    town: new FormControl('Seçiniz'),
    email: new FormControl(),
    phone: new FormControl(),
    name: new FormControl(),
    lastname: new FormControl(),
    password: new FormControl(),
    state: new FormControl()
  });

  constructor( private api: ApiServices, private route: ActivatedRoute, private toastr: ToastrService, private routes: Router) {
  }

  onSubmit() {
      if (this.id) {
        this.api.put('customers/' + this.id, this.customerForm.value).subscribe(() => {
          setTimeout(() => this.toastr.success('Müşteri kaydı güncellendi.'));
          setTimeout(() => this.routes.navigateByUrl('customers/list'), 1000);
        });
      } else {
        this.api.post('customers', this.customerForm.value).subscribe(() => {
          setTimeout(() => this.toastr.success('Müşteri kaydı oluşturuldu.'));
          setTimeout(() => this.routes.navigateByUrl('customers/list'), 1000);
        });
      }
  }

  onCheckboxChange(event) {
    if (this.customerForm.get(event.target.id)) {
      this.customerForm.patchValue({state: event.target.checked ? true : false});
    }
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.id = +params['id'];
        this.customer = this.api.get('customers/' + this.id).subscribe(c => this.customerForm.patchValue(c));
      }
    });
  }
  // delete customer
  onDelete(): void {
    this.api.delete('customers/' + this.id)
      .subscribe(r => {
        setTimeout(() => this.toastr.success('Müşteri kaydı silindi.'));
        setTimeout(() => this.routes.navigateByUrl('customers/list'), 2000);
      })
  }
}
