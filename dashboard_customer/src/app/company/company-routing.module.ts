import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyComponent} from './company.component'
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Company',
    },
    children: [
      {
        path: '',
        component: CompanyComponent,
        data: {
          title: 'Detail',
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule {}
