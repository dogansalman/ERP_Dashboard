import {Injectable } from '@angular/core';
import {Http, Response, RequestOptions, Headers, ResponseContentType} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {ToastrService} from 'ngx-toastr';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {subscribeOn} from "rxjs/operator/subscribeOn";

@Injectable()
export class AuthServices {
    public header = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      });
 
      private authUrl = 'http://192.168.1.240:8080/auth';

      constructor(private http: Http, private toastr: ToastrService, private slimLoadingBarService: SlimLoadingBarService) { }

      login(data): Observable<any> {

        let body = new URLSearchParams();
        body.set('username', data.username);
        body.set('password', data.password);
        body.set('grant_type', 'password');

            this.slimLoadingBarService.start(() => {  });

            const options = new RequestOptions({ headers: this.header });
            return this.http.post(this.authUrl, body.toString(), options )
              .map((res: Response) =>  <any[]> res.json())
              .catch((error: any) => {
                setTimeout(() => this.toastr.error('İşlem başarısız. Lütfen tekrar deneyin.', 'İstek başarısız!'));
                return Observable.throw(error || 'Server error')
        
              })
              ._finally(() => this.slimLoadingBarService.complete())
          }
}