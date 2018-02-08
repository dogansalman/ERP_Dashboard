import { NgModule } from '@angular/core';
import { CitiesDirective} from './cities.directive';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [ CommonModule ],
  declarations: [ CitiesDirective ],
  exports: [ CitiesDirective ]
})
export class CitiesModule { }
