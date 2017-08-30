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
    ChartsModule


  ],
  declarations: [ StockcardsComponent, StockcardComponent, StockmovementsComponent],
  providers: [
    ApiServices,
    TooltipConfig,
    BsModalRef
  ]
})
export class StockcardsModule { }
