import {Component, OnInit} from '@angular/core';
import {ApiServices} from '../services/api.services';



@Component({
  templateUrl: 'stocktypes.component.html'
})

export class StocktypesComponent implements  OnInit {
  public stocktpesList = [];

  constructor(private api: ApiServices) { }

  ngOnInit(): void {
    this.api.get('stocktypes').subscribe(s => this.stocktpesList = s);
  }
}
