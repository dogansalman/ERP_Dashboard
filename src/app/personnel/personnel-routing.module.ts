import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonnelsComponent } from './personnels.component';
import { PersonnelComponent } from './personnel.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Müşteriler',
    },
    children: [
      {
        path: 'list',
        component: PersonnelsComponent,
        data: {
          title: 'Personeller'
        }
      },
      {
        path: 'add',
        component: PersonnelComponent,
        data: {
          title: 'Ekle'
        }
      },
      {
        path: 'edit/:id',
        component: PersonnelComponent,
        data: {
          title: 'Düzenle'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonnelRoutingModule {}
