import { NgModule } from '@angular/core';
import { StocktypesDirective } from './stocktypes.directive';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [ CommonModule ],
  declarations: [ StocktypesDirective ],
  exports: [ StocktypesDirective ]
})
export class StocktypesModule { }
