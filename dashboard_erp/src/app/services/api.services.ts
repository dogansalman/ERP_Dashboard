import {Injectable } from '@angular/core';
import {Http, Response, RequestOptions, Headers, ResponseContentType} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {ToastrService} from 'ngx-toastr';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {subscribeOn} from "rxjs/operator/subscribeOn";


@Injectable()
export class ApiServices {


  private customHeader = new Headers({
    'Content-Type': 'application/json'
  });
  public host = 'http://192.168.1.240:8080/';
  public apiUrl = this.host + 'api/';

  constructor(private http: Http, private toastr: ToastrService, private slimLoadingBarService: SlimLoadingBarService) {


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
        setTimeout(() => { this.toastr.error('Lütfen tekrar deneyin', 'Kayıt bulunamadı!'); }, 100)
        return Observable.throw(error.json().error || 'Server error');
      })._finally(() => this.slimLoadingBarService.complete())
  }
  post(url, data): Observable<any> {
    this.slimLoadingBarService.start(() => {  });
    return this.http.post(this.apiUrl + url, data, this.header() )
      .map((res: Response) =>  <any[]> res.json())
      .catch((error: any) => {
        setTimeout(() => this.toastr.error('İşlem başarısız. Lütfen tekrar deneyin.', 'İstek başarısız!'));
        return Observable.throw(error || 'Server error')

      })
      ._finally(() => this.slimLoadingBarService.complete())
  }
  put(url, data): Observable<any> {
    this.slimLoadingBarService.start(() => {  });
    return this.http.put(this.apiUrl + url, data, this.header() )
      .map((res: Response) => <any[]> res.json())
      .catch((error: any) => {
        setTimeout(() => this.toastr.error('İşlem başarısız. Lütfen tekrar deneyin.', 'İstek başarısız!'));
        return Observable.throw(error || 'Server error');
      })
      ._finally(() => this.slimLoadingBarService.complete())
  }
  delete(url): Observable<any> {
    this.slimLoadingBarService.start(() => {  });
    return this.http.delete(this.apiUrl + url, this.header() )
      .catch((error: any) => {
        setTimeout(() => this.toastr.error('Kayıt silinemedi lütfen tekrar deneyin.', 'İşlem başarısız'));
        return Observable.throw(error || 'Server error')
      })
      ._finally(() => this.slimLoadingBarService.complete())
  }
  upload(url, formData): Observable<any> {
    this.slimLoadingBarService.start(() => {  });
    return this.http.post(this.apiUrl + url, formData, this.header({'Content-Type': 'multipart/form-data'}))
      .map(res => res.json())
      .catch((error: any) => {
      console.log(error);
        setTimeout(() => { this.toastr.error('Yükleme başarısız. Tekrar deneyin', 'Yükleme başarısız!'); }, 100)
        return Observable.throw(error.json().error || 'Server error');
      })._finally(() => this.slimLoadingBarService.complete())
  }
}


