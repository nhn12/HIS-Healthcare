import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import {
  FullLayoutComponent,
  SimpleLayoutComponent
} from './containers';
import { AuthenticationGuard } from 'app/core/authentication/authentication.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
    canActivate: [AuthenticationGuard]
  },
  {
    path: '',
    component: FullLayoutComponent,
    canActivate: [AuthenticationGuard],
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: './views/dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'components',
        loadChildren: './views/components/components.module#ComponentsModule'
      },
      {
        path: 'icons',
        loadChildren: './views/icons/icons.module#IconsModule'
      },
      {
        path: 'widgets',
        loadChildren: './views/widgets/widgets.module#WidgetsModule'
      },
      {
        path: 'charts',
        loadChildren: './views/chartjs/chartjs.module#ChartJSModule'
      },
      {
        path: 'reception',
        loadChildren: './modules/reception/reception-list/reception-list.module#ReceptionListModule'
      },
      {
        path: 'category',
        loadChildren: './modules/category/category-component.module#CategoryModule'
      },
      {
        path: 'schedule',
        loadChildren: './modules/schedule/schedule.module#ScheduleModule'
      }
      
    ]
  },
  {
    path: 'pages',
    component: SimpleLayoutComponent,
    data: {
      title: 'Pages'
    },
    children: [
      {
        path: '',
        loadChildren: './modules/login/pages.module#PagesModule',
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
