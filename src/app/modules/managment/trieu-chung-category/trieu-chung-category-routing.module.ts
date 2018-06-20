import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrieuChungCategoryListComponent } from './trieu-chung-list-component/trieu-chung-category-list.component';
import { TrieuChungCategoryCreationFormComponent } from './trieu-chung-creation-form-component/trieu-chung-category-creation-form.component';


const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Tiếp nhận'
        }, 
        children: [
            {
                path: 'views',
                component: TrieuChungCategoryListComponent,
                data: {
                    title: 'Danh mục ICD'
                }
            },
            {
                path: 'create',
                component: TrieuChungCategoryCreationFormComponent,
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
export class TrieuChungCategoryListRoutingModule { }
