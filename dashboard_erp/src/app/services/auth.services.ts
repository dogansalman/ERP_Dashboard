import {Injectable, OnInit} from '@angular/core';
import {Http, Response, RequestOptions, Headers, ResponseContentType} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {ToastrService} from 'ngx-toastr';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';




@Injectable()
export class AuthServices implements OnInit {

    public header = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      });
    public authUrl = 'http://192.168.1.222:8080/auth';

      ngOnInit(): void {
        console.log('fire');
      }

      constructor(private http: Http, private toastr: ToastrService, private slimLoadingBarService: SlimLoadingBarService) { }

      login(data): Observable<any> {

        const body = new URLSearchParams();
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
