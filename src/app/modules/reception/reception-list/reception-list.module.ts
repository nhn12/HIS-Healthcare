import { ShareComponentModule } from './../../../share-component/share-component.module';
import { FormsModule } from '@angular/forms';
import { CommonPaging } from './../../../core/condition/paging';
import { CommonFilter } from './../../../core/condition/filter';
import { NgModule, OnInit } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { ReceptionListComponent } from './reception-list.component';
import { ReceptionListRoutingModule } from './reception-list-routing.module';
import { ReceptionListService } from 'app/modules/reception/service/reception-list.service';
import { CommonSort } from 'app/core/condition/sort';
import { DefaultCondition, ConditionOperator } from 'app/core/condition/condition';
import { HttpCacheService } from 'app/core/http/http-cache.service';
import { HttpService } from 'app/core/http/http.service';
import { HttpModule, Http, XHRBackend, ConnectionBackend, RequestOptions } from '@angular/http';
import { AuthenticationService } from 'app/core/authentication/authentication.services';
import { CommonModule } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';


export function createHttpService(backend: ConnectionBackend,
  defaultOptions: RequestOptions,
  httpCacheService: HttpCacheService) {
  return new HttpService(backend, defaultOptions, httpCacheService);
}

@NgModule({
  imports: [
    ReceptionListRoutingModule, HttpModule, FormsModule, CommonModule, ShareComponentModule, BsDatepickerModule.forRoot(),
  ],
  declarations: [ReceptionListComponent],
  providers: [
    AuthenticationService,
    HttpCacheService,
    {
      provide: Http,
      deps: [XHRBackend, RequestOptions, HttpCacheService],
      useFactory: createHttpService
    }]
})
export class ReceptionListModule {


  constructor() {
  }


}
