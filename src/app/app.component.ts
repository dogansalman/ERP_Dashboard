import { Component } from '@angular/core';


@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<ng2-slim-loading-bar style="z-index: 99999" [color]="\'#20a8d8\'" [height]="\'4px\'"></ng2-slim-loading-bar> <router-outlet></router-outlet>'
})
export class AppComponent {
  constructor() {
  }
}
