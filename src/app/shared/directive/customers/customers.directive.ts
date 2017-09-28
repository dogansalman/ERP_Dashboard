import { Directive, Output, EventEmitter, OnInit } from '@angular/core';
import { ApiServices} from '../../../services/api.services';

@Directive({
  selector: '[appCustomers]'
})

export class CustomersDirective implements  OnInit {
  @Output('customers') customers: EventEmitter<object> = new EventEmitter<object>();

  constructor(private api: ApiServices) {}
  ngOnInit(): void {
    this.api.get('customers').subscribe(d => this.customers.emit(d));
  }
}
