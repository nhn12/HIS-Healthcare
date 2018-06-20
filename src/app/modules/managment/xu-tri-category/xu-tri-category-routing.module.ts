import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { XuTriCategoryListComponent } from './xu-tri-category-list-component/xu-tri-category-list.component';
import { XuTriCategoryCreationFormComponent } from './xu-tri-category-creation-form-component/xu-tri-category-creation-form.component';


const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Tiếp nhận'
        }, 
        children: [
            {
                path: 'views',
                component: XuTriCategoryListComponent,
                data: {
                    title: 'Danh mục ICD'
                }
            },
            {
                path: 'create',
                component: XuTriCategoryCreationFormComponent,
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
export class XuTriCategoryListRoutingModule { }
