import {Component, OnInit} from '@angular/core';
import {ApiServices} from '../services/api.services';
import {DatePipe} from '@angular/common';


@Component({
  templateUrl: 'suppliers.component.html'
})

export class SuppliersComponent implements  OnInit {
  public supplierList = [];

  constructor(private api: ApiServices) { }

  ngOnInit(): void {
   this.api.get('suppliers').subscribe(s => this.supplierList = s);
  }
}
