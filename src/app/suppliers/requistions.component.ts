import { Component, OnInit } from '@angular/core';
import { ApiServices } from '../services/api.services';
import { DatePipe } from '@angular/common';


@Component({
  templateUrl: 'requistions.component.html'
})

export class RequistionsComponent implements  OnInit {
  public supplyRequistions = [];

  constructor(private api: ApiServices) { }

  ngOnInit(): void {
    this.api.get('supply/request').subscribe(s => this.supplyRequistions = s);
  }
}
