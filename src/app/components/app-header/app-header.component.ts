import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AuthenticationService } from 'app/core/authentication/authentication.services';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html'
})
export class AppHeaderComponent {
  constructor(private router: Router, public auth: AuthenticationService) {
    
  }

  public logout() {
    this.auth.logout();
    this.router.navigate(['/pages/login'], { replaceUrl: true });
  }
 }
