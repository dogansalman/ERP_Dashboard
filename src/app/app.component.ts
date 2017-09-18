import { Component } from '@angular/core';


@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<ng2-slim-loading-bar></ng2-slim-loading-bar> <router-outlet></router-outlet>'
})
export class AppComponent {
  constructor() {
  }
}
