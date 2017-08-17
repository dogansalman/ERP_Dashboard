import { NgModule } from '@angular/core';
import { CustomersComponent } from './customers.component';
import { AddComponent } from './add.component'
import { CustomersRoutingModule } from './customers-routing.module';
import { HttpModule } from '@angular/http';
import { ApiServices } from '../services/api.services';
import { CommonModule } from '@angular/common';
import { CapitalizeFirstPipe } from '../pipes/capitalize.pipe'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CitiesDirective } from '../shared/cities.directive';
import { TownsDirective } from '../shared/towns.directive';

import { FilterPipe } from '../pipes/filter.pipe';
@NgModule({
  imports: [
    CustomersRoutingModule,
    HttpModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ CustomersComponent, AddComponent, CapitalizeFirstPipe, CitiesDirective, TownsDirective, FilterPipe  ],
  providers: [
    ApiServices
  ]
})
export class CustomersModule { }
