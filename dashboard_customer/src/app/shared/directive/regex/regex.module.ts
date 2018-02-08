import { NgModule } from '@angular/core';
import { RegexDirective} from './regex.directive';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [ CommonModule ],
  declarations: [ RegexDirective ],
  exports: [ RegexDirective ]
})
export class RegexModule { }
