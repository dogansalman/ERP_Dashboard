import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdersComponent } from './orders.component';
import { DocsComponent } from './docs.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Siparişler',
    },
    children: [
      {
        path: '',
        component: OrdersComponent,
        data: {
          title: 'Liste'
        }
      },
      {
        path: 'docs/:id/:title/:stockcard_id',
        component: DocsComponent,
        data: {
          title: 'Dokümanlar'
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
