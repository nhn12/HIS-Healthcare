import { AuthenticationGuard } from './core/authentication/authentication.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
    canActivate: [AuthenticationGuard]
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    },
    loadChildren: "./views/base/base.module#BaseModule"
  },
  {
    path: '',
    data: {
      title: 'Login Page'
    },
    loadChildren: './domain/login/defination/login.module#LoginModule'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: '',
        loadChildren: './domain/hospital/defination/hospital.module#HospitalModule',
        canActivate: [AuthenticationGuard]
      },
      {
        path: '',
        loadChildren: './domain/booking/defination/booking.module#BookingModule',
        canActivate: [AuthenticationGuard]
      },
      {
        path: '',
        loadChildren: './domain/schedule/defination/schedule.module#ScheduleModule',
        canActivate: [AuthenticationGuard]
      },
      {
        path: '',
        loadChildren: './domain/business-category/defination/category.module#CategoryModule',
        canActivate: [AuthenticationGuard]
      },
      {
        path: '',
        loadChildren: './domain/system-management/defination/system-management.module#SystemManagementModule',
        canActivate: [AuthenticationGuard]
      },
      {
        path: 'base',
        loadChildren: './views/base/base.module#BaseModule',
        canActivate: [AuthenticationGuard]
      },
      {
        path: 'buttons',
        loadChildren: './views/buttons/buttons.module#ButtonsModule',
        canActivate: [AuthenticationGuard]
      },
      {
        path: 'charts',
        loadChildren: './views/chartjs/chartjs.module#ChartJSModule',
        canActivate: [AuthenticationGuard]
      },
      {
        path: 'dashboard',
        loadChildren: './views/dashboard/dashboard.module#DashboardModule',
        canActivate: [AuthenticationGuard]
      },
      {
        path: 'icons',
        loadChildren: './views/icons/icons.module#IconsModule',
        canActivate: [AuthenticationGuard]
      },
      {
        path: 'notifications',
        loadChildren: './views/notifications/notifications.module#NotificationsModule',
        canActivate: [AuthenticationGuard]
      },
      {
        path: 'theme',
        loadChildren: './views/theme/theme.module#ThemeModule',
        canActivate: [AuthenticationGuard]
      },
      {
        path: 'widgets',
        loadChildren: './views/widgets/widgets.module#WidgetsModule',
        canActivate: [AuthenticationGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
