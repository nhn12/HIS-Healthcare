import { LoginService } from './../services/login.services';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { Component } from '@angular/core';
import { UserDto } from 'app/modules/login/services/data/UserDto';

@Component({
  templateUrl: 'login.component.html',
    providers: [LoginService]
})
export class LoginComponent {

  isLoading: boolean = false;
  username: string;
  password: string;
  constructor(public http: Http, public router: Router, public loginService: LoginService) { }

  login() {
    this.isLoading = true;
    let tempUser = new UserDto();
    tempUser.username = this.username;
    tempUser.password = this.password;
    this.loginService.login(tempUser).subscribe(result=>{
      setTimeout(()=>{
        this.isLoading = false;
        location.href = location.origin;
      }, 5000)
    }, error=>{
      this.isLoading = false;
    })
  }

  loginKeyUpdate(data) { 
    console.log(data);
    if(data.keyCode == 13) {
      this.login();
    }
  }

}
