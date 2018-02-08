import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ApiServices } from '../services/api.services';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { ExcelServices } from '../services/excel.services';

@NgModule({
  imports: [
    DashboardRoutingModule,
    ChartsModule,
    BsDropdownModule,
    HttpModule,
    CommonModule
  ],
  declarations: [ DashboardComponent ],
  providers: [ ApiServices, ExcelServices ]
})
export class DashboardModule { }
