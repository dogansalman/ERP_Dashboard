import {Component, OnInit} from '@angular/core';
import {ApiServices} from '../services/api.services'
import {HttpService} from "../services/http.service";

@Component({
  templateUrl: 'customers.component.html'
})
export class CustomersComponent  implements OnInit {

  constructor(private api: HttpService ) {

  }

  public custumerList = [];
  ngOnInit(): void {
    //console.log(this.api.get('customers'));

    this.api.get('customers')
      .subscribe(c =>  this.custumerList = c);


  }

}
