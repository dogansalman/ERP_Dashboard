import {Component, OnInit, OnDestroy} from '@angular/core';
import {ApiServices} from '../services/api.services';
import {ActivatedRoute} from '@angular/router';
import {DatePipe, AsyncPipe} from '@angular/common';
import { CapitalizeModule } from '../shared/pipes/capitalize/capitalize.module';

@Component({
  templateUrl: 'stockmovements.component.html'
})

export class StockmovementsComponent implements  OnInit {

  /*
  stock card id
   */
  public stockcard_id: number;
  /*
  stock movements list
   */
  public stockMovementList = [];
  /*
  stock card detail
   */
  public stockcardDetail: any;

  /*
  total enter stocks
   */
  public totalEnteredStock: number;
  /*
  Out of stocks
   */
  public totalOutStock: number;


  constructor(private api: ApiServices, private activeRouter: ActivatedRoute) {  }

  ngOnInit(): void {
    /*
    Get stock card id
     */
    this.activeRouter.params.subscribe(params => {
      if (params['id']) {
        this.stockcard_id = params['id'];
        /*
        get stockcard movements
         */
        this.api.get('stockmovements/' + this.stockcard_id).subscribe(sm => {
          this.stockMovementList = sm;
          let n = 0;
          sm.filter(stm => stm.movement_type === true).forEach(stmm => n += stmm.unit)
          this.totalEnteredStock = n;
          let m = 0;
          sm.filter(stm => !stm.movement_type).forEach(stmm => m += stmm.unit)
          this.totalOutStock = m;
        });

        /*
        get stockcard detail
         */
        this.api.get('stockcards/' + this.stockcard_id).subscribe(sc => this.stockcardDetail = sc)

        this.stockMovementList.filter(sm => sm.movement_type === true).forEach(sm => console.log(sm.unit))

      }
    })
  }
}
