import { NgModule } from '@angular/core';
import { CompanyComponent } from './company.component'
import { CompanyRoutingModule } from './company-routing.module';
import { HttpModule } from '@angular/http';
import { ApiServices } from '../services/api.services';
import { CommonModule } from '@angular/common';
import { CitiesModule } from '../shared/directive/cities/cities.module';
import { TownsModule } from '../shared/directive/towns/towns.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CapitalizeModule } from '../shared/pipes/capitalize/capitalize.module';
import { RegexModule } from '../shared/directive/regex/regex.module';

@NgModule({
  imports: [
    CompanyRoutingModule,
    HttpModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CapitalizeModule,
    RegexModule,
    CitiesModule,
    TownsModule
  ],
  declarations: [ CompanyComponent],
  providers: [
    ApiServices
  ]
})
export class CompanyModule { }
