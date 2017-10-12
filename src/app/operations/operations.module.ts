import { NgModule } from '@angular/core';
import { OperationsComponent } from './operations.component';
import { OperationComponent } from './operation.component';
import { OperationsRoutingModule} from './operations-routing.module';
import { HttpModule } from '@angular/http';
import { ApiServices } from '../services/api.services';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CapitalizeModule } from '../shared/pipes/capitalize/capitalize.module';
import { RegexModule } from '../shared/directive/regex/regex.module';

@NgModule({
  imports: [
    OperationsRoutingModule,
    HttpModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CapitalizeModule,
    RegexModule
  ],
  declarations: [ OperationsComponent, OperationComponent],
  providers: [
    ApiServices
  ]
})
export class OperationsModule { }
