import { CommonDataTableModule } from '../../../shared-component/common-data-table/common-data-table.module'
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RoleManagementComponent } from '../views/role-management/role-management.component';
import { SystemManagementRoutingModule } from './system-managment.route.module';
import { OperationManagmentComponent } from '../views/operation-managment/operation-managment.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SystemManagementRoutingModule,
    CommonDataTableModule
  ],
  declarations: [
    RoleManagementComponent,
    OperationManagmentComponent
  ],
  providers: []
})
export class SystemManagementModule { }
