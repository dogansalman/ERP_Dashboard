import {Component, OnInit} from '@angular/core';
import {ApiServices} from '../services/api.services';
import {DatePipe} from '@angular/common';


@Component({
  templateUrl: 'operations.component.html'
})

export class OperationsComponent implements  OnInit {
  public operationList = [];

  constructor(private api: ApiServices) { }

  ngOnInit(): void {
    this.api.get('operations').subscribe(s => this.operationList = s);
  }
}
