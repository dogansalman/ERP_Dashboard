import {Component, OnInit} from '@angular/core';
import {ApiServices} from '../services/api.services';
import {DatePipe} from '@angular/common';

@Component({
  templateUrl: 'personnels.component.html'
})
export class PersonnelsComponent implements  OnInit {
  public personnelList = [];
  constructor(private api: ApiServices) {}

  ngOnInit(): void {
    this.api.get('personnel').subscribe(p => this.personnelList = p);
  }
}
