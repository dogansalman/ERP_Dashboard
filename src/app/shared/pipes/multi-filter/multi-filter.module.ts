import { NgModule } from '@angular/core';
import { MultiFilterPipe} from './multi-filter.pipe';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [ CommonModule ],
  declarations: [ MultiFilterPipe ],
  exports: [ MultiFilterPipe ]
})
export class MultiFilterModule { }
