import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonnelsComponent } from './personnels.component';
import { PersonnelComponent } from './personnel.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Personel',
    },
    children: [
      {
        path: '',
        redirectTo: 'list',
      },
      {
        path: 'list',
        component: PersonnelsComponent,
        data: {
          title: 'Liste'
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
