import { NgModule } from '@angular/core';
import { PrintDirective} from './print.directive';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [ CommonModule ],
  declarations: [ PrintDirective ],
  exports: [ PrintDirective ]
})
export class PrintModule { }
