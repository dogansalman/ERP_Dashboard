import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderComponent } from './order.component';
import { OrdersComponent } from './orders.component';
import { ProductionmovementsComponent } from './productionmovements.component';
import { QualityComponent } from './quality.component';

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
      },
      {
        path: 'quality/:id',
        component: QualityComponent,
        data: {
          title: 'Kalite'
        }
      },
      {
        path: 'productions/:id',
        component: ProductionmovementsComponent,
        data: {
          title: 'Üretim Hareketleri'
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
