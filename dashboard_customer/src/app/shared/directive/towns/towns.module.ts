import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TownsDirective } from './towns.directive';

@NgModule({
  imports: [ CommonModule ],
  declarations: [ TownsDirective],
  exports: [ TownsDirective ]
})
export class TownsModule { }
