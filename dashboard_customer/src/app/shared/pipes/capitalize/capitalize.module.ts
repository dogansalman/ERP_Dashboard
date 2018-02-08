import { NgModule } from '@angular/core';
import { CapitalizeFirstPipe} from './capitalize.pipe';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [ CommonModule ],
  declarations: [ CapitalizeFirstPipe ],
  exports: [ CapitalizeFirstPipe ]
})
export class CapitalizeModule { }
