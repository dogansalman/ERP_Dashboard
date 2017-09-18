import {Component, OnInit} from '@angular/core';
import {ApiServices} from '../services/api.services'

@Component({
  templateUrl: 'customers.component.html'
})
export class CustomersComponent  implements OnInit {

  constructor(private api: ApiServices ) {

  }

  public custumerList = [];

  ngOnInit(): void {
    this.api.get('customers')
      .subscribe(c =>  this.custumerList = c);
  }

}
