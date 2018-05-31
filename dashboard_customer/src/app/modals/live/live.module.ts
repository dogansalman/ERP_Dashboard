import { NgModule } from '@angular/core';
import { LiveComponent } from './live.component';
import { HttpModule } from '@angular/http';
import { ApiServices } from '../../services/api.services';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    HttpModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [ LiveComponent],
  providers: [
    ApiServices
  ]
})
export class LiveModule { }
