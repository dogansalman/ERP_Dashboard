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
      title: 'CMDS'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'orders',
        loadChildren: './orders/orders.module#OrdersModule'
      },
      {
        path: 'company',
        loadChildren: './company/company.module#CompanyModule'
      }

    ]
  },
  {
    path: 'auth',
    component: SimpleLayoutComponent,
    data: {
      title: 'Auth'
    },
    children: [
      {
        path: '',
        loadChildren: './auth/auth.module#AuthModule',
      },
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
