import { ShareComponentModule } from './../../../share-component/share-component.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpModule, Http, XHRBackend, ConnectionBackend, RequestOptions } from '@angular/http';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { HttpCacheService } from '../../../core/http/http-cache.service';
import { HttpService } from '../../../core/http/http.service';
import { CommonListModule } from '../../../share-component/common-list-component/common-list-component.module';
import { AuthenticationService } from '../../../core/authentication/authentication.services';
import { TrieuChungCategoryListRoutingModule } from './trieu-chung-category-routing.module';
import { TrieuChungCategoryListComponent } from './trieu-chung-list-component/trieu-chung-category-list.component';
import { TrieuChungCategoryCreationFormComponent } from './trieu-chung-creation-form-component/trieu-chung-category-creation-form.component';


export function createHttpService(backend: ConnectionBackend,
  defaultOptions: RequestOptions,
  httpCacheService: HttpCacheService) {
  return new HttpService(backend, defaultOptions, httpCacheService);
}

@NgModule({
  imports: [
    TrieuChungCategoryListRoutingModule, 
    HttpModule, 
    CommonListModule,  
    FormsModule, 
    ReactiveFormsModule,
    TabsModule,
    CommonModule, 
    ShareComponentModule
  ],
  declarations: [TrieuChungCategoryListComponent, TrieuChungCategoryCreationFormComponent],
  providers: [
    AuthenticationService,
    HttpCacheService,
    {
      provide: Http,
      deps: [XHRBackend, RequestOptions, HttpCacheService],
      useFactory: createHttpService
    }]
})
export class TrieuChungCategoryModule {


  constructor() {
  }


}