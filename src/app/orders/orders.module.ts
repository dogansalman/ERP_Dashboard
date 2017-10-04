import { NgModule } from '@angular/core';
import { OrderComponent } from './order.component';
import { OrdersComponent } from './orders.component';
import { HttpModule } from '@angular/http';
import { ApiServices } from '../services/api.services';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CitiesModule } from '../shared/directive/cities/cities.module';
import { TownsModule } from '../shared/directive/towns/towns.module';
import { CapitalizeModule } from '../shared/pipes/capitalize/capitalize.module';
import { OrdersRoutingModule } from './orders-routing.module';
import { CustomersModule } from '../shared/directive/customers/customers.module';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { BsDatepickerActions } from 'ngx-bootstrap/datepicker/reducer/bs-datepicker.actions';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { TooltipModule } from 'ngx-bootstrap';
import { TooltipConfig } from 'ngx-bootstrap';

@NgModule({
  imports: [
    OrdersRoutingModule,
    HttpModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CapitalizeModule,
    CitiesModule,
    TooltipModule,
    TownsModule,
    CustomersModule,
    BsDatepickerModule.forRoot(),
    NguiAutoCompleteModule
  ],
  declarations: [ OrderComponent, OrdersComponent],
  providers: [
    ApiServices,
    BsDatepickerActions,
    TooltipConfig
  ]
})
export class OrdersModule { }
