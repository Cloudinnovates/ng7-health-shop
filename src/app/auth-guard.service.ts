import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authService.user$.pipe(
    map(user => {
      if (user) {
        return true;
      }
      this.router.navigate(['/login'], { queryParams: {
        returnUrl: state.url
      }});
      return false;
    }));
  }

  constructor(private authService: AuthService, private router: Router) { }
}
