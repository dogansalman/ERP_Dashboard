import { NgModule } from '@angular/core';
import { DepartmentsDirective } from './departments.directive';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [ CommonModule ],
  declarations: [ DepartmentsDirective ],
  exports: [ DepartmentsDirective ]
})
export class DepartmentsModule { }
