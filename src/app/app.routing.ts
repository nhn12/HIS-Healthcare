import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { RegisterComponent } from './views/register/register.component';
import { LoginComponent } from './modules/login/pages/login.component';
import { AuthenticationGuard } from './core/authentication/authentication.guard';

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
    },
    canActivate: [AuthenticationGuard]
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    },
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    canActivate: [AuthenticationGuard],
    children: [
      {
        path: 'base',
        loadChildren: './views/base/base.module#BaseModule'
      },
      {
        path: 'buttons',
        loadChildren: './views/buttons/buttons.module#ButtonsModule'
      },
      {
        path: 'charts',
        loadChildren: './views/chartjs/chartjs.module#ChartJSModule'
      },
      {
        path: 'dashboard',
        loadChildren: './views/dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'icons',
        loadChildren: './views/icons/icons.module#IconsModule'
      },
      {
        path: 'notifications',
        loadChildren: './views/notifications/notifications.module#NotificationsModule'
      },
      {
        path: 'theme',
        loadChildren: './views/theme/theme.module#ThemeModule'
      },
      {
        path: 'icd-category',
        loadChildren: './modules/managment/icd-category/icd-category.module#IcdCategoryModule'
      },
      {
        path: 'tien-can-category',
        loadChildren: './modules/managment/tien-can-category/tien-can-category.module#TienCanCategoryModule'
      },
      {
        path: 'xu-tri-category',
        loadChildren: './modules/managment/xu-tri-category/xu-tri-category.module#XuTriCategoryModule'
      },
      {
        path: 'reason-category',
        loadChildren: './modules/managment/reason-category/reason-category.module#ReasonCategoryModule'
      },
      {
        path: 'can-lam-sang-category',
        loadChildren: './modules/managment/tong-quat-category/tong-quat-category.module#TongQuatCategoryModule'
      },
      {
        path: 'cac-bo-phan-category',
        loadChildren: './modules/managment/cac-bo-phan-category/cac-bo-phan-category.module#CacBoPhanCategoryModule'
      },
      {
        path: 'reception',
        loadChildren: './modules/reception/reception-list/reception-list.module#ReceptionListModule'
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
