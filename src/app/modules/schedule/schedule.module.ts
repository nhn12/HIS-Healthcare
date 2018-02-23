import { CommonListModule } from 'app/share-component/common-list-component/common-list-component.module';
import { CategoryModule } from './../category/category-component.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpCacheService } from 'app/core/http/http-cache.service';
import { HttpService } from 'app/core/http/http.service';
import { HttpModule, Http, XHRBackend, ConnectionBackend, RequestOptions } from '@angular/http';
import { AuthenticationService } from 'app/core/authentication/authentication.services';
import { CommonModule } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgModule } from '@angular/core';
import { ShareComponentModule } from 'app/share-component/share-component.module';
import {SelectModule} from 'ng2-select';
import { BlueprintScheduleCreateComponent } from 'app/modules/schedule/pages/blueprint-schedule-create/blueprint-schedule-create.component';
import { ScheduleRoutingModule } from 'app/modules/schedule/schedule-routing.module';
import { TextMaskModule } from 'angular2-text-mask';
import { BlueprintScheduleListComponent } from 'app/modules/schedule/pages/blueprint-schedule-list/blueprint-schedule-list.component';


export function createHttpService(backend: ConnectionBackend,
  defaultOptions: RequestOptions,
  httpCacheService: HttpCacheService) {
  return new HttpService(backend, defaultOptions, httpCacheService);
}

@NgModule({
  imports: [
    HttpModule, 
    FormsModule, 
    CommonModule, 
    ShareComponentModule, 
    BsDatepickerModule.forRoot(),
    ReactiveFormsModule,
    SelectModule,
    ModalModule.forRoot(),
    ScheduleRoutingModule,
    TextMaskModule,
    CommonListModule
  ],
  declarations: [BlueprintScheduleCreateComponent, BlueprintScheduleListComponent],
  providers: [
    AuthenticationService,
    HttpCacheService,
    {
      provide: Http,
      deps: [XHRBackend, RequestOptions, HttpCacheService],
      useFactory: createHttpService
    }]
})
export class ScheduleModule {
  constructor() {
  }
}
