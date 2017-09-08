import { NgModule, ElementRef } from '@angular/core';
import { StockcardsComponent } from './stockcards.component';
import { StockcardComponent } from './stockcard.component';
import { StockcardsRoutingModule } from './stockcards-routing.module';
import { StockmovementsComponent } from './stockmovements.component';
import { HttpModule } from '@angular/http';
import { ApiServices } from '../services/api.services';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CitiesModule } from '../shared/directive/cities/cities.module';
import { TownsModule } from '../shared/directive/towns/towns.module';
import { CapitalizeModule } from '../shared/pipes/capitalize/capitalize.module';
import { StocktypesModule } from '../shared/directive/stocktypes/stocktypes.module';
import { SuppliersModule } from '../shared/directive/suppliers/suppliers.module';
import { TooltipModule } from 'ngx-bootstrap';
import { TooltipConfig } from 'ngx-bootstrap';
import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { FilterPipe } from '../shared/pipes/filter/filter.pipe';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap'
import { BsDatepickerActions } from 'ngx-bootstrap/datepicker/reducer/bs-datepicker.actions';


@NgModule({
  imports: [
    StockcardsRoutingModule,
    HttpModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CapitalizeModule,
    CitiesModule,
    TownsModule,
    StocktypesModule,
    SuppliersModule,
    TooltipModule,
    ModalModule.forRoot(),
    ChartsModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot()
  ],
  declarations: [ StockcardsComponent, StockcardComponent, StockmovementsComponent, FilterPipe],
  providers: [
    ApiServices,
    TooltipConfig,
    BsModalRef,
    BsDatepickerActions,
  ]
})
export class StockcardsModule { }
