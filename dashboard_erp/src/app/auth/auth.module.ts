import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Login } from './login.component';
import { Logout } from './logout.component';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthServices } from '../services/auth.services';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
@NgModule({
    imports: [ AuthRoutingModule, ReactiveFormsModule, FormsModule, HttpModule ],
    declarations: [
        Login,
        Logout
    ],
    providers: [
        AuthServices
    ]
  })

export class AuthModule {}
