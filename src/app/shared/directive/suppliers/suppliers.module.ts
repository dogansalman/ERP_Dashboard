import { NgModule } from '@angular/core';
import { SuppliersDirective} from './suppliers.directive';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [ CommonModule ],
  declarations: [ SuppliersDirective ],
  exports: [ SuppliersDirective ]
})
export class SuppliersModule { }
