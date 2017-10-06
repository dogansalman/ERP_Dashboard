import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OperationsComponent } from './operations.component';
import { OperationComponent } from './operation.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Üretim Operasyonları',
    },
    children: [
      {
        path: '',
        redirectTo: 'list',
      },
      {
        path: 'list',
        component: OperationsComponent,
        data: {
          title: 'Liste'
        }
      },
      {
        path: 'add',
        component: OperationComponent,
        data: {
          title: 'Ekle'
        }
      },
      {
        path: 'edit/:id',
        component: OperationComponent,
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
export class OperationsRoutingModule {}
