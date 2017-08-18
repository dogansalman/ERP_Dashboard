import {Component, OnInit} from '@angular/core';
import {ApiServices} from '../services/api.services';
import {NgForm} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  templateUrl: 'add.component.html'
})
export class AddComponent  implements OnInit {
  public id: number;

  constructor( private api: ApiServices, private route: ActivatedRoute, private toastr: ToastrService) {

  }

  onSubmit(f: NgForm) {
    this.api.post('customers/add', f.value).subscribe(r => setTimeout(() => this.toastr.success('Müşteri kaydı oluşturuldu.')));
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.id = +params['id'];
      }
    });

  }
  // delete customer
  onDelete(): void {

    this.api.delete('customers/delete/' + this.id)
      .subscribe(r => setTimeout(() => this.toastr.success('Müşteri kaydı silindi.')))
  }

}
