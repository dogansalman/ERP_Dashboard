import { NgModule } from '@angular/core';
import { PasswordComponent } from "./password.component";
//import { CompanyRoutingModule } from './company-routing.module';
import { HttpModule } from '@angular/http';
import { ApiServices } from "../../services/api.services";
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  imports: [
  //  CompanyRoutingModule,
    HttpModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [ PasswordComponent],
  providers: [
    ApiServices
  ]
})
export class PasswordModule { }
