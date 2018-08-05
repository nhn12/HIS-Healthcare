import { FormsModule } from '@angular/forms';
import { LoginPageComponent } from '../views/login-page/login-page.component';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login.route.module';
import { NgModule } from '@angular/core';
import { LaddaModule } from 'angular2-ladda';
import { UserService } from '../provider/user-service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LoginRoutingModule,
    LaddaModule.forRoot({
      style: "expand-left"
    })
  ],
  declarations: [
    LoginPageComponent
  ],
  providers: [UserService]
})
export class LoginModule { }
