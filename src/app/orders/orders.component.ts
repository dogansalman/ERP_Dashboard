import {Component, OnInit} from '@angular/core';
import {ApiServices} from '../services/api.services';
import {DatePipe} from '@angular/common';


@Component({
  templateUrl: 'orders.component.html'
})

export class OrdersComponent implements  OnInit {
  public orderList = [];

  constructor(private api: ApiServices) { }

  ngOnInit(): void {
    this.api.get('orders').subscribe(s => this.orderList = s);
  }
}
