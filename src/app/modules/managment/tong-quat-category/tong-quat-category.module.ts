import { ShareComponentModule } from './../../../share-component/share-component.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpModule, Http, XHRBackend, ConnectionBackend, RequestOptions } from '@angular/http';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { HttpCacheService } from '../../../core/http/http-cache.service';
import { HttpService } from '../../../core/http/http.service';
import { CommonListModule } from '../../../share-component/common-list-component/common-list-component.module';
import { TongQuatCategoryListComponent } from './tong-quat-category-list-component/tong-quat-category-list.component';
import { TongQuatCategoryCreationFormComponent } from './tong-quat-category-creation-form-component/tong-quat-category-creation-form.component';
import { AuthenticationService } from '../../../core/authentication/authentication.services';
import { TongQuatCategoryListRoutingModule } from './tong-quat-category-routing.module';
import { NgxSelectModule } from 'ngx-select-ex';


export function createHttpService(backend: ConnectionBackend,
  defaultOptions: RequestOptions,
  httpCacheService: HttpCacheService) {
  return new HttpService(backend, defaultOptions, httpCacheService);
}

@NgModule({
  imports: [
    TongQuatCategoryListRoutingModule, 
    HttpModule, 
    CommonListModule,  
    FormsModule, 
    ReactiveFormsModule,
    TabsModule,
    NgxSelectModule,
    CommonModule, 
    ShareComponentModule
  ],
  declarations: [TongQuatCategoryListComponent, TongQuatCategoryCreationFormComponent],
  providers: [
    AuthenticationService,
    HttpCacheService,
    {
      provide: Http,
      deps: [XHRBackend, RequestOptions, HttpCacheService],
      useFactory: createHttpService
    }]
})
export class TongQuatCategoryModule {


  constructor() {
  }


}
