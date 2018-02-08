import { NgModule } from '@angular/core';
import { PersonnelsComponent} from './personnels.component';
import { PersonnelComponent } from './personnel.component';
import { PersonnelRoutingModule} from './personnel-routing.module';
import { HttpModule } from '@angular/http';
import { ApiServices } from '../services/api.services';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DepartmentsModule } from '../shared/directive/departments/departments.module';
import { CapitalizeModule } from '../shared/pipes/capitalize/capitalize.module';

@NgModule({
  imports: [
    PersonnelRoutingModule,
    HttpModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CapitalizeModule,
    DepartmentsModule
  ],
  declarations: [ PersonnelsComponent, PersonnelComponent ],
  providers: [
    ApiServices
  ]
})
export class PersonnelModule { }
