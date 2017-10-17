import { NgModule } from '@angular/core';
import { RangeDirective} from './range.directive';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [ CommonModule ],
  declarations: [ RangeDirective ],
  exports: [ RangeDirective ]
})
export class RangeModule { }
