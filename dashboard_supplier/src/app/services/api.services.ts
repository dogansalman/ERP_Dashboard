import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { ToastrService } from 'ngx-toastr';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { Router } from '@angular/router';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {subscribeOn} from "rxjs/operator/subscribeOn";


@Injectable()
export class ApiServices {

  private customHeader = new Headers({
    'Content-Type': 'application/json'
  });
  public host = 'http://api.abkar.com.tr/';
  public apiUrl = this.host + 'api/';

  constructor(private http: Http, private toastr: ToastrService, private slimLoadingBarService: SlimLoadingBarService, private route: Router) {


  }
  getToken(): any {
    return window.localStorage.getItem('access_token');
  }
  header(params = {}): RequestOptions {
    params = Object.assign(params,
      {
        'Accept': 'application/json'
      }, params || {})

    if (this.getToken()) Object.assign(params, {'Authorization': 'Bearer ' + this.getToken()});

    const headers = new Headers(params);
    return  new RequestOptions({ headers: headers });
  }
  isJson(r): any {
    return  /^[\],:{}\s]*$/.test(r.replace(/\\["\\\/bfnrtu]/g, '@').
    replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
    replace(/(?:^|:|,)(?:\s*\[)+/g, '')) ? true : false;
  }

  get(url): Observable<any> {
    this.slimLoadingBarService.start(() => {  });
    return this.http.get(this.apiUrl + url, this.header() )
      .map((res: Response) =>  <any[]> res.json())
      .catch((error: any) => {
        if (error.status === 401) {
          setTimeout(() => { this.toastr.error('Oturumunuz zaman aşımına uğradı tekrar giriş yapın.', ''); }, 100)
          this.route.navigate(['/auth/logout']);
        }
        setTimeout(() => { this.toastr.error('Lütfen tekrar deneyin', 'Kayıt bulunamadı!'); }, 100)
        return Observable.throw(error.json().error || 'Server error');
      })._finally(() => this.slimLoadingBarService.complete())
  }
  post(url, data): Observable<any> {
    this.slimLoadingBarService.start(() => {  });
    return this.http.post(this.apiUrl + url, data, this.header() )
      .map((res: Response) =>  <any[]> res.json())
      .catch((error: any) => {
        if (error.status === 401) {
          setTimeout(() => { this.toastr.error('Oturumunuz zaman aşımına uğradı tekrar giriş yapın.', ''); }, 100)
          this.route.navigate(['/auth/logout']);
        }
        setTimeout(() => this.toastr.error('İşlem başarısız.', 'Tekrar deneyin!'));
        return Observable.throw(error || 'Server error')

      })
      ._finally(() => this.slimLoadingBarService.complete())
  }
  put(url, data): Observable<any> {
    this.slimLoadingBarService.start(() => {  });
    return this.http.put(this.apiUrl + url, data, this.header() )
      .map((res: Response) => <any[]> res.json())
      .catch((error: any) => {
        if (error.status === 401) {
          setTimeout(() => { this.toastr.error('Oturumunuz zaman aşımına uğradı tekrar giriş yapın.', ''); }, 100)
          this.route.navigate(['/auth/logout']);
        }
        setTimeout(() => this.toastr.error('İşlem başarısız.', 'Tekrar deneyin!'));
        return Observable.throw(error || 'Server error');
      })
      ._finally(() => this.slimLoadingBarService.complete())
  }
  delete(url): Observable<any> {
    this.slimLoadingBarService.start(() => {  });
    return this.http.delete(this.apiUrl + url, this.header() )
      .catch((error: any) => {
        if (error.status === 401) {
          setTimeout(() => { this.toastr.error('Oturumunuz zaman aşımına uğradı tekrar giriş yapın.', ''); }, 100)
          this.route.navigate(['/auth/logout']);
        }
        setTimeout(() => this.toastr.error('Kayıt silinemedi lütfen tekrar deneyin.', 'İşlem başarısız'));
        return Observable.throw(error || 'Server error')
      })
      ._finally(() => this.slimLoadingBarService.complete())
  }
  upload(url, formData): Observable<any> {
    this.slimLoadingBarService.start(() => {  });
    return this.http.post(this.apiUrl + url, formData, this.header())
      .map(res => res.json())
      .catch((error: any) => {
        if (error.status === 401) {
          setTimeout(() => { this.toastr.error('Oturumunuz zaman aşımına uğradı tekrar giriş yapın.', ''); }, 100)
          this.route.navigate(['/auth/logout']);
        }
        setTimeout(() => { this.toastr.error('Yükleme başarısız. Tekrar deneyin', 'Yükleme başarısız!'); }, 100)
        return Observable.throw(error.json().error || 'Server error');
      })._finally(() => this.slimLoadingBarService.complete())
  }
}



