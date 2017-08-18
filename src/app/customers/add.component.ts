import {Component, OnInit} from '@angular/core';
import {ApiServices} from '../services/api.services';
import {NgForm} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  templateUrl: 'add.component.html'
})
export class AddComponent  implements OnInit {
  public id: number;

  constructor( private api: ApiServices, private route: ActivatedRoute, private toastr: ToastsManager) {

  }

  onSubmit(f: NgForm) {
    this.api.post('customers/add', f.value).subscribe(r => console.log(r));
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.id = +params['id'];
      }
    });
    this.toastr.success('You are awesome!', 'Success!');
  }
  // delete customer
  onDelete(): void {
    this.api.delete('customers/delete/' + this.id).subscribe(r => console.log(r));
  }

}
