import { Directive, Output, EventEmitter, OnInit } from '@angular/core';
import { ApiServices} from '../../../services/api.services';

@Directive({
  selector: '[appStockType]'
})

export class StocktypesDirective implements  OnInit {
  @Output('stocktypes') stocktypes: EventEmitter<object> = new EventEmitter<object>();

  constructor(private api: ApiServices) {}
  ngOnInit(): void {
    this.api.get('stocktypes').subscribe(d => this.stocktypes.emit(d));
  }
}
