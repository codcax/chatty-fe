import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

@Injectable()
export class AuthenticationGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const storedToken = localStorage.getItem('token');
    const url = state.url;
    let userIsAuth: boolean;
    let userNotAuth: boolean;

    if (url === '/') {
      if (!storedToken) {
        userIsAuth = false;
        this.router.navigate(['/login']);
      } else {
        userIsAuth = true;
      }

      return userIsAuth;
    } else {
      if (!storedToken) {
        userNotAuth = true;
      } else {
        userNotAuth = false;
        this.router.navigate(['/dashboard']);
      }
      return userNotAuth;
    }

  }
}
