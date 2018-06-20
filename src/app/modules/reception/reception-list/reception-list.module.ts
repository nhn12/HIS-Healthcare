import { NgxSelectModule } from 'ngx-select-ex';
import { SelectModule } from 'ng2-select';
import { ReceptionCreateComponent } from './../reception-create/reception-create.component';
import { CommonListModule } from 'app/share-component/common-list-component/common-list-component.module';
import { ShareComponentModule } from './../../../share-component/share-component.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ElasticModule } from 'angular2-elastic';
import { TongQuatPublicModule } from '../../managment/tong-quat-category/tong-quat-public-form/tong-quat-public-form.module';
import { ChuanDoanPublicFormModule } from '../../managment/icd-category/chuan-doan-public-form/chuan-doan-public-form.module';
import { ReasonPublicFormModule } from '../../managment/reason-category/reason-public-form/reason-public-form.module';
import { DiseasePublicFormModule } from '../../managment/disease-history-category/disease-public-form/disease-public-form.module';
import { TienCanPublicFormModule } from '../../managment/tien-can-category/tien-can-public-form/tien-can-public-form.module';
import { CacBoPhanPublicFormModule } from '../../managment/cac-bo-phan-category/cac-bo-phan-public-form/cac-bo-phan-public-form.module';


export function createHttpService(backend: ConnectionBackend,
  defaultOptions: RequestOptions,
  httpCacheService: HttpCacheService) {
  return new HttpService(backend, defaultOptions, httpCacheService);
}

@NgModule({
  imports: [
    ReceptionListRoutingModule, 
    ElasticModule,
    HttpModule, 
    CommonListModule,  
    FormsModule, 
    NgxSelectModule,
    ReactiveFormsModule,
    TabsModule,
    ModalModule.forRoot(),
    CommonModule, 
    TongQuatPublicModule,
    ChuanDoanPublicFormModule,
    ReasonPublicFormModule,
    DiseasePublicFormModule,
    TienCanPublicFormModule,
    CacBoPhanPublicFormModule,
    ShareComponentModule, BsDatepickerModule.forRoot(),
  ],
  declarations: [ReceptionListComponent, ReceptionCreateComponent],
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
