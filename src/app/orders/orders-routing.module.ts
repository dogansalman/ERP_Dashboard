import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderComponent } from './order.component';
import { OrdersComponent } from './orders.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Siparişler',
    },
    children: [
      {
        path: '',
        redirectTo: 'list',
      },
      {
        path: 'list',
        component: OrdersComponent,
        data: {
          title: 'Liste'
        }
      },
      {
        path: 'add',
        component: OrderComponent,
        data: {
          title: 'Ekle'
        }
      },
      {
        path: 'edit/:id',
        component: OrderComponent,
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
export class OrdersRoutingModule {}
