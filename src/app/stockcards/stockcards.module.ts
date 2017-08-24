import { NgModule } from '@angular/core';
import { StockcardsComponent } from './stockcards.component';
import { StockcardComponent } from './stockcard.component';
import { StockaddComponent } from './stockadd.component';
import { StockcardsRoutingModule } from './stockcards-routing.module';
import { HttpModule } from '@angular/http';
import { ApiServices } from '../services/api.services';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CitiesModule } from '../shared/directive/cities/cities.module';
import { TownsModule } from '../shared/directive/towns/towns.module';
import { CapitalizeModule } from '../shared/pipes/capitalize/capitalize.module';
import { StocktypesModule } from '../shared/directive/stocktypes/stocktypes.module';
import { TooltipModule } from 'ngx-bootstrap';
import { TooltipConfig } from 'ngx-bootstrap';

import { ModalModule } from 'ngx-bootstrap'
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';



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
    TooltipModule,
    ModalModule
  ],
  declarations: [ StockcardsComponent, StockcardComponent],
  providers: [
    ApiServices,
    TooltipConfig,
    BsModalService,
    BsModalRef,
    StockaddComponent
  ]
})
export class StockcardsModule { }
