import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SuppliersComponent } from './suppliers.component';
import { SupplierComponent } from './supplier.component';
import { RequistionsComponent } from './requistions.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Tedarikçi',
    },
    children: [
      {
        path: '',
        redirectTo: 'list',
      },
      {
        path: 'list',
        component: SuppliersComponent,
        data: {
          title: 'Liste'
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
      },
      {
        path: 'requistion',
        component: RequistionsComponent,
        data: {
          title: 'Tedarik İstekleri'
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
