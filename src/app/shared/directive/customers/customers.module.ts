import { NgModule } from '@angular/core';
import { CustomersDirective} from './customers.directive';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [ CommonModule ],
  declarations: [ CustomersDirective ],
  exports: [ CustomersDirective ]
})
export class CustomersModule { }
