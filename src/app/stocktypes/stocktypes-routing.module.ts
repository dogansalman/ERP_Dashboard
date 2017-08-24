import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StocktypesComponent } from './stocktypes.component';
import { StocktypeComponent } from './stocktype.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Stok Modelleri',
    },
    children: [
      {
        path: 'list',
        component: StocktypesComponent,
        data: {
          title: 'Stok Modelleri'
        }
      },
      {
        path: 'add',
        component: StocktypeComponent,
        data: {
          title: 'Ekle'
        }
      },
      {
        path: 'edit/:id',
        component: StocktypeComponent,
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
export class StocktypesRoutingModule {}
