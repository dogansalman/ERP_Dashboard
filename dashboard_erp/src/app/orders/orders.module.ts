import { NgModule } from '@angular/core';
import { OrderComponent } from './order.component';
import { OrdersComponent } from './orders.component';
import { ProductionmovementsComponent } from './productionmovements.component';
import { HttpModule } from '@angular/http';
import { ApiServices } from '../services/api.services';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CapitalizeModule } from '../shared/pipes/capitalize/capitalize.module';
import { OrdersRoutingModule } from './orders-routing.module';
import { CustomersModule } from '../shared/directive/customers/customers.module';
import { BsDatepickerModule, ModalModule, BsModalRef} from 'ngx-bootstrap';
import { BsDatepickerActions } from 'ngx-bootstrap/datepicker/reducer/bs-datepicker.actions';
import { RegexModule } from '../shared/directive/regex/regex.module';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { TooltipModule } from 'ngx-bootstrap';
import { TooltipConfig } from 'ngx-bootstrap';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { PrintModule } from '../shared/directive/print/print.module';
import { RangeModule } from '../shared/directive/range/range.module';
import { ExcelServices } from '../services/excel.services';
import { WaybillComponent } from '../shared/components/waybill/waybill.component';
import { QualityComponent } from './quality.component';

@NgModule({
  imports: [
    OrdersRoutingModule,
    HttpModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CapitalizeModule,
    TooltipModule,
    CustomersModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NguiAutoCompleteModule,
    TabsModule,
    RegexModule,
    PrintModule,
    RangeModule
  ],
  declarations: [ OrderComponent, OrdersComponent, ProductionmovementsComponent, QualityComponent],
  providers: [
    ApiServices,
    BsDatepickerActions,
    TooltipConfig,
    BsModalRef,
    ExcelServices,
    WaybillComponent
  ]
})
export class OrdersModule { }
