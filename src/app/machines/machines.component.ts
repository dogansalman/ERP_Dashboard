import {Component, OnInit} from '@angular/core';
import {ApiServices} from '../services/api.services';
import {DatePipe} from '@angular/common';


@Component({
  templateUrl: 'machines.component.html'
})

export class MachinesComponent implements  OnInit {
  public machineList = [];

  constructor(private api: ApiServices) { }

  ngOnInit(): void {
    this.api.get('machines').subscribe(s => this.machineList = s);
  }
}
