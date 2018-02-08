import { Directive, Output, EventEmitter, OnInit } from '@angular/core';
import { ApiServices} from '../../../services/api.services';

@Directive({
  selector: '[appSuppliers]'
})

export class SuppliersDirective implements  OnInit {
  @Output('suppliers') suppliers: EventEmitter<object> = new EventEmitter<object>();

  constructor(private api: ApiServices) {}
  ngOnInit(): void {
    this.api.get('suppliers').subscribe(d => this.suppliers.emit(d));
  }
}
