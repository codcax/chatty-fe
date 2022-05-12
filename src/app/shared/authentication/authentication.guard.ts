import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

import {AuthenticationService} from "./authentication.service";


@Injectable()
export class AuthenticationGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const userIsAuth = this.authService.getUserIsAuth();
    if (!userIsAuth) {
      this.router.navigate(['/login']);
    }
    return userIsAuth;
  }
}
