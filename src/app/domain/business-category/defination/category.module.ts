import { FormSchemaModule } from './../../../shared-component/form/form-modules';
import { NgSelectModule } from '@ng-select/ng-select';
import { CategoryRoutingModule } from './category.route';
import { WardCreateComponent } from '../views/ward/ward-create.component'
import { CommonDataTableModule } from '../../../shared-component/common-data-table/common-data-table.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SpecializationCreateComponent } from '../views/specialization/specialization-create.component';
import { SpecializationListComponent } from '../views/specialization/specialization-list.component';
import { WardListComponent } from '../views/ward/ward-list.component';
import { DoctorCreateComponent } from '../views/doctor/doctor-create.component';
import { DoctorListComponent } from '../views/doctor/doctor-list.component';
import { TextMaskModule } from 'angular2-text-mask';
import { ApplicationPipesModule } from '../../../containers/common-pipe/application-pipe.module';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TextMaskModule,
        ReactiveFormsModule,
        CategoryRoutingModule,
        NgSelectModule,
        CommonDataTableModule,
        FormSchemaModule
    ],
    declarations: [
        SpecializationCreateComponent,
        SpecializationListComponent,
        WardCreateComponent,
        WardListComponent,
        DoctorCreateComponent,
        DoctorListComponent
    ],
    providers: []
})
export class CategoryModule { }
