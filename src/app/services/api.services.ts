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
  private apiUrl = 'http://192.168.1.222:8080/api/';

  constructor(private http: Http, private toastr: ToastrService, private slimLoadingBarService: SlimLoadingBarService) {


  }

  isJson(r): any {
   return  /^[\],:{}\s]*$/.test(r.replace(/\\["\\\/bfnrtu]/g, '@').
      replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
      replace(/(?:^|:|,)(?:\s*\[)+/g, '')) ? true : false;
 }
  get(url): Observable<any> {
    this.slimLoadingBarService.start(() => {  });
    return this.http.get(this.apiUrl + url )
      .map((res: Response) =>  <any[]> res.json())
      .catch((error: any) => {
        setTimeout(() => { this.toastr.error('Lütfen tekrar deneyin', 'Kayıt bulunamadı!'); }, 100)
        return Observable.throw(error.json().error || 'Server error');
      })._finally(() => this.slimLoadingBarService.complete())
  }
  post(url, data): Observable<any> {

    this.slimLoadingBarService.start(() => {  });

    const headers = new Headers({ 'Accept': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + url, data, options )
      .map((res: Response) =>  <any[]> res.json())
      .catch((error: any) => {
        setTimeout(() => this.toastr.error('İşlem başarısız. Lütfen tekrar deneyin.', 'İstek başarısız!'));
        return Observable.throw(error.json().error || 'Server error');

      })
      ._finally(() => this.slimLoadingBarService.complete())
  }
  put(url, data): Observable<any> {
    this.slimLoadingBarService.start(() => {  });
    const headers = new Headers({ 'Accept': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http.put(this.apiUrl + url, data, options )
      .map((res: Response) => <any[]> res.json())
      .catch((error: any) => {
        setTimeout(() => this.toastr.error('İşlem başarısız. Lütfen tekrar deneyin.', 'İstek başarısız!'));
        return Observable.throw(error || 'Server error');
      })
      ._finally(() => this.slimLoadingBarService.complete())
  }

  delete(url): Observable<any> {
    this.slimLoadingBarService.start(() => {  });
    return this.http.delete(this.apiUrl + url )
      .catch((error: any) => {
        setTimeout(() => this.toastr.error('Kayıt silinemedi lütfen tekrar deneyin.', 'İşlem başarısız'));
        return Observable.throw(error || 'Server error')
      })
      ._finally(() => this.slimLoadingBarService.complete())
  }

  upload(url, formData): Observable<any> {
    this.slimLoadingBarService.start(() => {  });

    const headers = new Headers();
    headers.append('Content-Type', 'multipart/form-data');
   // const options = new RequestOptions({ headers: headers });

    return this.http.post(this.apiUrl + url, formData)
      .map(res => res.json())
      .catch((error: any) => {
      console.log(error);
        setTimeout(() => { this.toastr.error('Yükleme başarısız. Tekrar deneyin', 'Yükleme başarısız!'); }, 100)
        return Observable.throw(error.json().error || 'Server error');
      })._finally(() => this.slimLoadingBarService.complete())
  }

}


