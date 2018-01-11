import { AuthenticationService } from './authentication.services';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Logger } from 'app/core/logger/logger.service';


const log = new Logger('AuthenticationGuard');

@Injectable()
export class AuthenticationGuard implements CanActivate {

  constructor(private router: Router, public authenticationService: AuthenticationService) { }

  canActivate(): boolean {
    if (this.authenticationService.isAuthenticated()) {
      return true;
    }

    log.debug('Not authenticated, redirecting...');
    this.router.navigate(['/pages/login'], { replaceUrl: true });
    return false;
  }

}
