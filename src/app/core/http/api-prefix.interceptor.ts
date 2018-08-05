/**
 * @description: Auto prefix for backend url.
 * @author: NamNguyen
 */

import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

/**
 * Prefixes all requests with `environment.serverUrl`.
 */
@Injectable()
export class ApiPrefixInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({ url: this.detectRequestURL(request.url) });
    return next.handle(request);
  }

  /**
   * Detect http request
   */
  private detectRequestURL(url: string) {
    if(!url) {
      return url;
    }

    if(url.match(/\bhttps?:\/\/\S+/gi)) {
      // Override environment.serverUrl
      return url;
    }

    return environment.serverUrl + url;
  }

}
