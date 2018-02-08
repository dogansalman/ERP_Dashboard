import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  template: '<h2>Oturum Kapatılıyor....</h2>'
})

export class Logout implements OnInit {

  constructor(private route: Router) {

  }
  ngOnInit(): void {
    window.localStorage.removeItem('access_token');
    window.localStorage.removeItem('date');
    window.localStorage.removeItem('fullname');
    window.localStorage.removeItem('role');
    this.route.navigate(['/auth/login']);
  }
}
