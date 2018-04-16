import { NgModule } from '@angular/core';
import { AddDocsComponent } from './add-docs.component';
import { HttpModule } from '@angular/http';
import { ApiServices } from '../../services/api.services';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BsDatepickerModule} from 'ngx-bootstrap';
import { BsDatepickerActions } from 'ngx-bootstrap/datepicker/reducer/bs-datepicker.actions';

@NgModule({
  imports: [
    HttpModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule,
  ],
  declarations: [ AddDocsComponent],
  providers: [
    ApiServices,
    BsDatepickerActions
  ]
})
export class AddDocsModule { }
