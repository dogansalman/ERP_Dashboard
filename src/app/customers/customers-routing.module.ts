import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomersComponent } from './customers.component';
import { CustomerComponent} from './customer.component'
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
        component: CustomerComponent,
        data: {
          title: 'Yeni Müşteri'
        }
      },
      {
        path: 'edit/:id',
        component: CustomerComponent,
        data: {
          title: 'Müşteri Düzenle'
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
