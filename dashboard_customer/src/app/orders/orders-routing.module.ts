import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdersComponent } from './orders.component';
import { ProductionmovementsComponent } from './productionmovements.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Orders',
    },
    children: [
      {
        path: '',
        component: OrdersComponent,
        data: {
          title: 'Orders Overview'
        }
      },
      {
        path: 'productions/:id',
        component: ProductionmovementsComponent,
        data: {
          title: 'Production Movements'
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
