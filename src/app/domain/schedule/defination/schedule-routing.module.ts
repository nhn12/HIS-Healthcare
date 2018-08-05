import { BlueprintScheduleCreateComponent } from './../views/blueprint-schedule-create/blueprint-schedule-create.component';
import { BlueprintScheduleListComponent } from './../views/blueprint-schedule-list/blueprint-schedule-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScheduleListComponent } from '../views/schedule-list/schedule-list.component';


const routes: Routes = [
  {
    path: 'schedule',
    data: {
      title: 'Tổ chức'
    },
    children: [
      {
        path: "blueprint",
        children: [
          {
            path: "create",
            component: BlueprintScheduleCreateComponent,
            data: {
              title: "Quy hoạch giờ"
            }
          },
          {
            path: "list",
            component: BlueprintScheduleListComponent,
            data: {
              title: "Quy hoạch giờ"
            }
          }
        ]
      },
      {
        path: "list",
        component: ScheduleListComponent,
        data: {
          title: "Thông tin quy hoạch"
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduleRoutingModule { }
