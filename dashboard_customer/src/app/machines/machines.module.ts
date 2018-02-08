import { NgModule } from '@angular/core';
import { MachinesComponent } from './machines.component';
import { MachineComponent } from './machine.component';
import { MachinesRoutingModule} from './machines-routing.module';
import { HttpModule } from '@angular/http';
import { ApiServices } from '../services/api.services';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CapitalizeModule } from '../shared/pipes/capitalize/capitalize.module';

@NgModule({
  imports: [
    MachinesRoutingModule,
    HttpModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CapitalizeModule,
  ],
  declarations: [ MachinesComponent, MachineComponent],
  providers: [
    ApiServices
  ]
})
export class MachinesModule { }
