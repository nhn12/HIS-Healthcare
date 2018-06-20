import { ShareComponentModule } from './../../../share-component/share-component.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpModule, Http, XHRBackend, ConnectionBackend, RequestOptions } from '@angular/http';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { HttpCacheService } from '../../../core/http/http-cache.service';
import { HttpService } from '../../../core/http/http.service';
import { CommonListModule } from '../../../share-component/common-list-component/common-list-component.module';
import { TienCanCategoryListComponent } from './tien-can-category-list-component/tien-can-category-list.component';
import { TienCanCategoryCreationFormComponent } from './tien-can-category-creation-form-component/tien-can-category-creation-form.component';
import { AuthenticationService } from '../../../core/authentication/authentication.services';
import { TienCanCategoryListRoutingModule } from './tien-can-category-routing.module';


export function createHttpService(backend: ConnectionBackend,
  defaultOptions: RequestOptions,
  httpCacheService: HttpCacheService) {
  return new HttpService(backend, defaultOptions, httpCacheService);
}

@NgModule({
  imports: [
    TienCanCategoryListRoutingModule, 
    HttpModule, 
    CommonListModule,  
    FormsModule, 
    ReactiveFormsModule,
    TabsModule,
    CommonModule, 
    ShareComponentModule
  ],
  declarations: [TienCanCategoryListComponent, TienCanCategoryCreationFormComponent],
  providers: [
    AuthenticationService,
    HttpCacheService,
    {
      provide: Http,
      deps: [XHRBackend, RequestOptions, HttpCacheService],
      useFactory: createHttpService
    }]
})
export class TienCanCategoryModule {


  constructor() {
  }


}
