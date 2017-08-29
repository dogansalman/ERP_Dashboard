import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StockcardsComponent } from './stockcards.component';
import { StockcardComponent } from './stockcard.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Stok Kart'
    },
    children: [
      {
        path: '',
        redirectTo: 'list',
      },
      {
        path: 'list',
        component: StockcardsComponent,
        data: {
          title: 'Liste'
        }
      },
      {
        path: 'add',
        component: StockcardComponent,
        data: {
          title: 'Ekle'
        }
      },
      {
        path: 'edit/:id',
        component: StockcardComponent,
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
export class StockcardsRoutingModule {}
