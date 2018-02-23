import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlueprintScheduleCreateComponent } from 'app/modules/schedule/pages/blueprint-schedule-create/blueprint-schedule-create.component';
import { BlueprintScheduleListComponent } from 'app/modules/schedule/pages/blueprint-schedule-list/blueprint-schedule-list.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Tổ chức'
    },
    children: [
        {
            path: "blueprint-schedule-create",
            component: BlueprintScheduleCreateComponent,
            data: {
              title:"Quy hoạch giờ"
            }
        },
        {
            path: "blueprint-schedule-list",
            component: BlueprintScheduleListComponent,
            data: {
              title:"Quy hoạch giờ"
            }
        }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduleRoutingModule {}
