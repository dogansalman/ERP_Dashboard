import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthServices } from '../services/auth.services';
import { Router } from '@angular/router';

@Component({
    templateUrl: 'login.component.html'
})

export class Login implements OnInit {

    public loginForm: FormGroup;

    constructor(private formBuilder: FormBuilder, private auth: AuthServices, private route: Router) {
        this.loginForm = formBuilder.group({
            'username': [null, Validators.required],
            'password': [null, Validators.required],
            'grant_type': ['password', Validators.required]
          });
    }

    onLogin(): void {
        if(!this.loginForm.value.username || !this.loginForm.value.password) return;
        this.auth.login(this.loginForm.value).subscribe(token => this.saveToken(token) );
    }

    saveToken(token): void {
      window.localStorage.setItem('role', token.roles);
      window.localStorage.setItem('fullname', token.fullname);
      window.localStorage.setItem('access_token', token.access_token);
      window.localStorage.setItem('date', token.date);
      this.route.navigate(['/dashboard']);
    }

    ngOnInit(): void {

    }
}
