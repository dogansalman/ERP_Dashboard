import { BaseRequestOptions } from '@angular/http';

export class AngularReduxRequestOptions extends BaseRequestOptions {

  public token: string;

  constructor () {

    super();

   // const user = JSON.parse(localStorage.getItem('user'));
   // this.token = user && user.token;
    this.headers.append('Content-Type', 'application/json');
  //  this.headers.append('Authorization', 'Bearer ' + this.token );


    /*
        if (angularReduxOptions != null) {

      for (let option in angularReduxOptions) {
        const optionValue = angularReduxOptions[option];
        this[option] = optionValue;
      }
    }
     */

  }


}
