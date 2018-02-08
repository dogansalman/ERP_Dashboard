import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Login } from './login.component';
import { Logout } from './logout.component';
import { rootRoute } from '@angular/router/src/router_module';

const routes: Routes = [
    {
      path: '',
      data: {
        title: 'Giriş'
      },
      children: [
          {
          path: 'login',
          component: Login,
          data: {
            title: 'Login Page'
            }
          },
          {
            path: 'logout',
            component: Logout,
            data: {
              title: 'Closing login'
            }
          }
      ]
    }
  ];

  @NgModule({
      imports: [RouterModule.forChild(routes)],
      exports: [RouterModule]
  })
  export class AuthRoutingModule { }
