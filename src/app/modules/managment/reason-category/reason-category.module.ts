import { ShareComponentModule } from './../../../share-component/share-component.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpModule, Http, XHRBackend, ConnectionBackend, RequestOptions } from '@angular/http';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { HttpCacheService } from '../../../core/http/http-cache.service';
import { HttpService } from '../../../core/http/http.service';
import { CommonListModule } from '../../../share-component/common-list-component/common-list-component.module';
import { ReasonCategoryListComponent } from './reason-category-list-component/reason-category-list.component';
import { ReasonCategoryCreationFormComponent } from './reason-category-creation-form-component/reason-category-creation-form.component';
import { AuthenticationService } from '../../../core/authentication/authentication.services';
import { ReasonCategoryListRoutingModule } from './reason-category-routing.module';


export function createHttpService(backend: ConnectionBackend,
  defaultOptions: RequestOptions,
  httpCacheService: HttpCacheService) {
  return new HttpService(backend, defaultOptions, httpCacheService);
}

@NgModule({
  imports: [
    ReasonCategoryListRoutingModule, 
    HttpModule, 
    CommonListModule,  
    FormsModule, 
    ReactiveFormsModule,
    TabsModule,
    CommonModule, 
    ShareComponentModule
  ],
  declarations: [ReasonCategoryListComponent, ReasonCategoryCreationFormComponent],
  providers: [
    AuthenticationService,
    HttpCacheService,
    {
      provide: Http,
      deps: [XHRBackend, RequestOptions, HttpCacheService],
      useFactory: createHttpService
    }]
})
export class ReasonCategoryModule {


  constructor() {
  }


}
