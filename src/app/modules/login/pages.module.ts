import { NgModule } from '@angular/core';
import { LoginComponent } from 'app/modules/login/pages/login.component';
import { LoginRoutingModule } from 'app/modules/login/pages-routing.module';
import { FormsModule } from '@angular/forms';
import { LaddaModule } from 'angular2-ladda';
import { HttpCacheService } from 'app/core/http/http-cache.service';
import { HttpService } from 'app/core/http/http.service';
import { HttpModule, Http, XHRBackend, ConnectionBackend, RequestOptions } from '@angular/http';
import { AuthenticationService } from 'app/core/authentication/authentication.services';
import { LoginService } from 'app/modules/login/services/login.services';



export function createHttpService(backend: ConnectionBackend,
  defaultOptions: RequestOptions,
  httpCacheService: HttpCacheService) {
  return new HttpService(backend, defaultOptions, httpCacheService);
}

@NgModule({
  imports: [LoginRoutingModule, FormsModule, LaddaModule.forRoot({
    style: "expand-left",
  }), HttpModule],
  declarations: [
    LoginComponent,
  ],
  providers: [
    AuthenticationService,
    HttpCacheService,
    {
      provide: Http,
      deps: [XHRBackend, RequestOptions, HttpCacheService],
      useFactory: createHttpService
    }]
})
export class PagesModule { }
