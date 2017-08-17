import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomersComponent } from './customers.component';
import { AddComponent} from './add.component'
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Müşteriler',
    },
    children: [
      {
        path: 'list',
        component: CustomersComponent,
        data: {
          title: 'Yeni Müşteri'
        }
      },
      {
        path: 'add',
        component: AddComponent,
        data: {
          title: 'Yeni Müşteri'
        }
      },
      {
        path: 'edit/:id',
        component: AddComponent,
        data: {
          title: 'Yeni Düzenle'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule {}
