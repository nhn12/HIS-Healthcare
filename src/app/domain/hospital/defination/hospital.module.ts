import { ImageUploadModule } from 'angular2-image-upload';
import { HospitalCreateComponent } from '../views/hospital-create/hospital-create.component';
import { HospitalListComponent } from '../views/hospital-list/hospital-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HospitalRoutingModule } from './hospital.routing';
import { HospitalService } from '../provider/hospital-service';
import { ElasticModule } from 'angular2-elastic';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HospitalRoutingModule,
    ElasticModule,
    ImageUploadModule.forRoot(),

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
