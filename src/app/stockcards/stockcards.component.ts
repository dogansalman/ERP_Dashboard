import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {ApiServices} from '../services/api.services';
import {StockaddComponent} from './stockadd.component';


@Component({
  templateUrl: 'stockcards.component.html'
})


export class StockcardsComponent implements  OnInit {

  public stockCardList = [];

  constructor(private api: ApiServices, private stockadd: StockaddComponent ) { }

  ngOnInit(): void {

    this.api.get('stockcards').subscribe(s => this.stockCardList = s);
    this.stockadd.openModal();
  }
  addStock(event): void {
    event.preventDefault();
    alert('clicked');
  }
}
