import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from 'app/modules/login/pages/login.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Example Pages'
    },
    children: [
      {
        path: 'login',
        component: LoginComponent,
        data: {
          title: 'Đăng nhập'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule {}
