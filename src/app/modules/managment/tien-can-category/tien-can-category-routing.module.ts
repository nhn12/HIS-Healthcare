import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TienCanCategoryListComponent } from './tien-can-category-list-component/tien-can-category-list.component';
import { TienCanCategoryCreationFormComponent } from './tien-can-category-creation-form-component/tien-can-category-creation-form.component';


const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Tiếp nhận'
        }, 
        children: [
            {
                path: 'views',
                component: TienCanCategoryListComponent,
                data: {
                    title: 'Danh mục ICD'
                }
            },
            {
                path: 'create',
                component: TienCanCategoryCreationFormComponent,
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
export class TienCanCategoryListRoutingModule { }
