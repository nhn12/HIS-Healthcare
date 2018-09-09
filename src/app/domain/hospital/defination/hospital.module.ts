import { ApplicationPipesModule } from './../../../containers/common-pipe/application-pipe.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FormSchemaModule } from './../../../shared-component/form/form-modules';
import { ImageUploadModule } from 'angular2-image-upload';
import { HospitalCreateComponent } from '../views/hospital-create/hospital-create.component';
import { HospitalListComponent } from '../views/hospital-list/hospital-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HospitalRoutingModule } from './hospital.routing';
import { HospitalService } from '../provider/hospital-service';
import { ElasticModule } from 'angular2-elastic';
import { ComponentUtil } from '../../../shared-component/component-util.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HospitalRoutingModule,
    ElasticModule,
    BsDropdownModule,
    ImageUploadModule.forRoot(),
    FormSchemaModule,
    ApplicationPipesModule,
    ComponentUtil
  ],
  declarations: [
    HospitalListComponent,
    HospitalCreateComponent
  ],
  providers: [
    HospitalService
  ]
})
export class HospitalModule { }
