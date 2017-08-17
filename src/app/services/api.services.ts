import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ApiServices {
  private customHeader = new Headers({
    'Content-Type': 'application/json'
  });
  private apiUrl = 'http://localhost:8080/api/';

  constructor(private http: Http) {
  }
  get(url): Observable<any> {
    return this.http.get(this.apiUrl + url )
      .map((res: Response) =>  <any[]> res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  post(url, data): Observable<any> {
    const headers = new Headers({ 'Accept': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + url, data, options )
      .map((res: Response) =>  <any[]> res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  delete(url): Observable<any> {
    return this.http.delete(this.apiUrl + url )
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

}

