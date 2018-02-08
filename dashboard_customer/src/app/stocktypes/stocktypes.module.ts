import { NgModule } from '@angular/core';
import { StocktypesComponent } from './stocktypes.component';
import { StocktypeComponent } from './stocktype.component';
import { StocktypesRoutingModule} from './stocktypes-routing.module';
import { HttpModule } from '@angular/http';
import { ApiServices } from '../services/api.services';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CitiesModule } from '../shared/directive/cities/cities.module';
import { TownsModule } from '../shared/directive/towns/towns.module';
import { CapitalizeModule } from '../shared/pipes/capitalize/capitalize.module';

@NgModule({
  imports: [
    StocktypesRoutingModule,
    HttpModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CapitalizeModule,
    CitiesModule,
    TownsModule
  ],
  declarations: [ StocktypesComponent, StocktypeComponent],
  providers: [
    ApiServices
  ]
})
export class StocktypesModule { }
