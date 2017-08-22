import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SuppliersComponent } from './suppliers.component';
import { SupplierComponent } from './supplier.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Tedarikçiler',
    },
    children: [
      {
        path: 'list',
        component: SuppliersComponent,
        data: {
          title: 'Tedarikçiler'
        }
      },
      {
        path: 'add',
        component: SupplierComponent,
        data: {
          title: 'Ekle'
        }
      },
      {
        path: 'edit/:id',
        component: SupplierComponent,
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
export class SuppliersRoutingModule {}
