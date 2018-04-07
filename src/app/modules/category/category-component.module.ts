import { DoctorCreateComponent } from './pages/doctor/doctor-create.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SpecializationCreateComponent } from './pages/specialization/specialization-create.component';
import { SpecializationListComponent } from './pages/specialization/specialization-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpCacheService } from 'app/core/http/http-cache.service';
import { HttpService } from 'app/core/http/http.service';
import { HttpModule, Http, XHRBackend, ConnectionBackend, RequestOptions } from '@angular/http';
import { AuthenticationService } from 'app/core/authentication/authentication.services';
import { CommonModule } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgModule } from '@angular/core';
import { ShareComponentModule } from 'app/share-component/share-component.module';
import { CategoryRoutingModule } from 'app/modules/category/ward-list-routing.module';
import { WardListComponent } from 'app/modules/category/pages/ward/ward-list.component';
import { WardCreateComponent } from 'app/modules/category/pages/ward/ward-create.component';
import { SelectModule } from 'ng2-select';
import { CommonListModule } from 'app/share-component/common-list-component/common-list-component.module';
import { SpecializationPricePartialComponent } from './pages/specialization/specialization-price-partial.component';
import { NgxSelectModule } from 'ngx-select-ex';
import { DoctorListComponent } from './pages/doctor/doctor-list.component';
import { TextMaskModule } from 'angular2-text-mask';

export function createHttpService(backend: ConnectionBackend,
  defaultOptions: RequestOptions,
  httpCacheService: HttpCacheService) {
  return new HttpService(backend, defaultOptions, httpCacheService);
}

@NgModule({
  imports: [
    CategoryRoutingModule,
    HttpModule, FormsModule,
    CommonModule,
    ShareComponentModule,
    BsDatepickerModule.forRoot(),
    ReactiveFormsModule,
    SelectModule,
    ModalModule.forRoot(),
    CommonListModule,
    NgxSelectModule,
    TextMaskModule
  ],
  declarations: [
    WardListComponent,
    WardCreateComponent,
    SpecializationListComponent,
    SpecializationCreateComponent,
    SpecializationPricePartialComponent,
    DoctorListComponent,
    DoctorCreateComponent
  ],
  providers: [
    AuthenticationService,
    HttpCacheService,
    {
      provide: Http,
      deps: [XHRBackend, RequestOptions, HttpCacheService],
      useFactory: createHttpService
    }
  ]
})
export class CategoryModule {


  constructor() {
  }


}
