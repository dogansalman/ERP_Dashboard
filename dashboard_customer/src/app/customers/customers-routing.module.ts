import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomersComponent } from './customers.component';
import { CustomerComponent} from './customer.component'
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Müşteri',
    },
    children: [
      {
        path: '',
        redirectTo: 'list',
      },
      {
        path: 'list',
        component: CustomersComponent,
        data: {
          title: 'Liste'
        }
      },
      {
        path: 'add',
        component: CustomerComponent,
        data: {
          title: 'Ekle'
        }
      },
      {
        path: 'edit/:id',
        component: CustomerComponent,
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
export class CustomersRoutingModule {}
