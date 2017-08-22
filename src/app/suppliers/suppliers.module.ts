import { NgModule } from '@angular/core';
import { SuppliersComponent } from './suppliers.component';
import { SupplierComponent } from './supplier.component';
import { SuppliersRoutingModule } from './suppliers-routing.module';
import { HttpModule } from '@angular/http';
import { ApiServices } from '../services/api.services';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CitiesModule } from '../shared/directive/cities/cities.module';
import { TownsModule } from '../shared/directive/towns/towns.module';
import { CapitalizeModule } from '../shared/pipes/capitalize/capitalize.module';

@NgModule({
  imports: [
    SuppliersRoutingModule,
    HttpModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CapitalizeModule,
    CitiesModule,
    TownsModule
  ],
  declarations: [ SuppliersComponent, SupplierComponent],
  providers: [
    ApiServices
  ]
})
export class SuppliersModule { }
