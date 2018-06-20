import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReasonCategoryListComponent } from './reason-category-list-component/reason-category-list.component';
import { ReasonCategoryCreationFormComponent } from './reason-category-creation-form-component/reason-category-creation-form.component';


const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Tiếp nhận'
        }, 
        children: [
            {
                path: 'views',
                component: ReasonCategoryListComponent,
                data: {
                    title: 'Danh mục ICD'
                }
            },
            {
                path: 'create',
                component: ReasonCategoryCreationFormComponent,
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
export class ReasonCategoryListRoutingModule { }
