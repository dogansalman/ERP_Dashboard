import { Directive, Output, EventEmitter, OnInit } from '@angular/core';
import { ApiServices} from '../../../services/api.services';

@Directive({
  selector: '[appDepartments]'
})

export class DepartmentsDirective implements  OnInit {
  @Output('departments') departments: EventEmitter<object> = new EventEmitter<object>();

  constructor(private api: ApiServices) {}
  ngOnInit(): void {
    this.api.get('departments').subscribe(d => this.departments.emit(d));
  }
}
