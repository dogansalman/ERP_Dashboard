import {Component, OnInit} from '@angular/core';
import {ApiServices} from '../services/api.services';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  templateUrl: 'orders.component.html'
})

  export class OrdersComponent implements  OnInit {
  public orderList = [];

  constructor(private api: ApiServices, private toastr: ToastrService, public router: Router) { }

  ngOnInit(): void {
    // Get orders
    this.api.get('supplier/requisitions').subscribe(o => this.orderList = o);
  }

  public regxStockCard(scName: string): string {
    return  scName.replace(/ /g, '-').toLowerCase();
  }


}
