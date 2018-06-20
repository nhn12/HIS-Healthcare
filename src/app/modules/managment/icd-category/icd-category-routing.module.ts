import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IcdListComponent } from './icd-list-component/icd-list.component';
import { IcdCreationFormComponent } from './icd-creation-form-component/icd-creation-form.component';


const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Tiếp nhận'
        }, 
        children: [
            {
                path: 'views',
                component: IcdListComponent,
                data: {
                    title: 'Danh mục ICD'
                }
            },
            {
                path: 'create',
                component: IcdCreationFormComponent,
                data: {
                    title: 'Tạo ICD'
                }
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class IcdCatgoryListRoutingModule { }
