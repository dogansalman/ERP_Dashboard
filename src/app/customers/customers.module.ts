import { NgModule } from '@angular/core';
import { CustomersComponent } from './customers.component';
import { CustomerComponent } from './customer.component'
import { CustomersRoutingModule } from './customers-routing.module';
import { HttpModule } from '@angular/http';
import { ApiServices } from '../services/api.services';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CitiesModule } from '../shared/directive/cities/cities.module';
import { TownsModule } from '../shared/directive/towns/towns.module';
import { CapitalizeModule } from '../shared/pipes/capitalize/capitalize.module';
import { RegexModule } from '../shared/directive/regex/regex.module';

@NgModule({
  imports: [
    CustomersRoutingModule,
    HttpModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CapitalizeModule,
    CitiesModule,
    TownsModule,
    RegexModule
  ],
  declarations: [ CustomersComponent, CustomerComponent],
  providers: [
    ApiServices
  ]
})
export class CustomersModule { }
