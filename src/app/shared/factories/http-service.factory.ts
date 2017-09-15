import { XHRBackend } from '@angular/http';
import { HttpService } from '../../services/http.service';
import { LoaderService } from '../loader/loader.services';
import {AngularReduxRequestOptions} from '../../services/angular-redux-request.options';


function httpServiceFactory(backend: XHRBackend, options: AngularReduxRequestOptions, loaderService: LoaderService ) {
  return new HttpService(backend, options, loaderService);
}


export { httpServiceFactory }
