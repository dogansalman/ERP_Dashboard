import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
// Layouts
import { FullLayoutComponent } from './layouts/full-layout.component';
import { SimpleLayoutComponent } from './layouts/simple-layout.component';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: FullLayoutComponent,
    data: {
      title: 'Yönetim'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'components',
        loadChildren: './components/components.module#ComponentsModule'
      },
      {
        path: 'icons',
        loadChildren: './icons/icons.module#IconsModule'
      },
      {
        path: 'widgets',
        loadChildren: './widgets/widgets.module#WidgetsModule'
      },
      {
        path: 'customers',
        loadChildren: './customers/customers.module#CustomersModule'
      },
      {
        path: 'personnel',
        loadChildren: './personnel/personnel.module#PersonnelModule'
      },
      {
        path: 'supplier',
        loadChildren: './supplier/supplier.module#SupplierModule'
      },
      {
        path: 'stocktypes',
        loadChildren: './stocktypes/stocktypes.module#StocktypesModule'
      },
      {
        path: 'stockcards',
        loadChildren: './stockcards/stockcards.module#StockcardsModule'
      },
      {
        path: 'orders',
        loadChildren: './orders/orders.module#OrdersModule'
      },
      {
        path: 'machines',
        loadChildren: './machines/machines.module#MachinesModule'
      },
      {
        path: 'operations',
        loadChildren: './operations/operations.module#OperationsModule'
      },
      {
        path: 'charts',
        loadChildren: './chartjs/chartjs.module#ChartJSModule'
      }

    ]
  },
  {
    path: 'auth',
    component: SimpleLayoutComponent,
    data: {
      title: 'Giriş'
    },
    children: [
      {
        path: '',
        loadChildren: './auth/auth.module#AuthModule',
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {

  constructor(private route: Router) {
    if (!window.localStorage.getItem('access_token')) this.route.navigate(['/auth/login']);
  }

}
