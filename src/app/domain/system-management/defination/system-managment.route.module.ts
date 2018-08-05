import { OperationManagmentComponent } from '../views/operation-managment/operation-managment.component'
import { RoleManagementComponent } from '../views/role-management/role-management.component'
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: 'system-management',
        data: {
            title: 'Phân quyền'
        },
        children: [
            {
                path: 'role',
                children: [{
                    path:'list',
                    component: RoleManagementComponent,
                    data: {
                        title: 'Phân quyền'
                    }
                }]
            },
            {
                path: 'operation',
                children: [{
                    path:'list',
                    component: OperationManagmentComponent,
                    data: {
                        title: 'Phân quyền'
                    }
                }]
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SystemManagementRoutingModule { }
