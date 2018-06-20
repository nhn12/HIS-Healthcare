import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CacBoPhanCategoryListComponent } from './cac-bo-phan-category-list-component/cac-bo-phan-category-list.component';
import { CacBoPhanCategoryCreationFormComponent } from './cac-bo-phan-category-creation-form-component/cac-bo-phan-category-creation-form.component';


const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Tiếp nhận'
        }, 
        children: [
            {
                path: 'views',
                component: CacBoPhanCategoryListComponent,
                data: {
                    title: 'Danh mục ICD'
                }
            },
            {
                path: 'create',
                component: CacBoPhanCategoryCreationFormComponent,
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
export class CacBoPhanCategoryListRoutingModule { }
