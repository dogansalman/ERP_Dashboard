import { NgModule } from '@angular/core';
import { FilterPipe} from './filter.pipe';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [ CommonModule ],
  declarations: [ FilterPipe ],
  exports: [ FilterPipe ]
})
export class FilterModule { }
