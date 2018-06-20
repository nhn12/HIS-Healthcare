import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TongQuatCategoryListComponent } from './tong-quat-category-list-component/tong-quat-category-list.component';
import { TongQuatCategoryCreationFormComponent } from './tong-quat-category-creation-form-component/tong-quat-category-creation-form.component';


const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Tiếp nhận'
        }, 
        children: [
            {
                path: 'views',
                component: TongQuatCategoryListComponent,
                data: {
                    title: 'Danh mục Tổng quát'
                }
            },
            {
                path: 'create',
                component: TongQuatCategoryCreationFormComponent,
                data: {
                    title: 'Tạo Tổng quát'
                }
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TongQuatCategoryListRoutingModule { }
