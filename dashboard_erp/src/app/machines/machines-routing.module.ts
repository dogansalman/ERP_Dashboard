import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MachinesComponent } from './machines.component';
import { MachineComponent } from './machine.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Üretim Makineleri',
    },
    children: [
      {
        path: '',
        redirectTo: 'list',
      },
      {
        path: 'list',
        component: MachinesComponent,
        data: {
          title: 'Liste'
        }
      },
      {
        path: 'add',
        component: MachineComponent,
        data: {
          title: 'Ekle'
        }
      },
      {
        path: 'edit/:id',
        component: MachineComponent,
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
export class MachinesRoutingModule {}
