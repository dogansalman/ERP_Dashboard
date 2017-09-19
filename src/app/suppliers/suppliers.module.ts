import { NgModule } from '@angular/core';
import { SuppliersComponent } from './suppliers.component';
import { SupplierComponent } from './supplier.component';
import { SuppliersRoutingModule } from './suppliers-routing.module';
import { RequistionsComponent } from './requistions.component';
import { HttpModule } from '@angular/http';
import { ApiServices } from '../services/api.services';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CitiesModule } from '../shared/directive/cities/cities.module';
import { TownsModule } from '../shared/directive/towns/towns.module';
import { CapitalizeModule } from '../shared/pipes/capitalize/capitalize.module';
import { TooltipModule } from 'ngx-bootstrap';
import { TooltipConfig } from 'ngx-bootstrap';
import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';

@NgModule({
  imports: [
    SuppliersRoutingModule,
    HttpModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CapitalizeModule,
    CitiesModule,
    TownsModule,
    TooltipModule,
    ModalModule.forRoot(),
  ],
  declarations: [ SuppliersComponent, SupplierComponent, RequistionsComponent],
  providers: [
    ApiServices,
    TooltipConfig,
    BsModalRef
  ]
})
export class SuppliersModule { }
