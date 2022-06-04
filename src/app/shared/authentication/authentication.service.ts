import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Apollo} from 'apollo-angular';
import {catchError, map, Subject} from 'rxjs';

import {SignupGqlService} from '../../graphql/authentication/signup-gql.service';
import {LoginGqlService} from '../../graphql/authentication/login-gql.service';

import {UserSignUp, UserLogin, UserAuthToken} from './authentication.model';
import {Errors} from '../error/error.model';


@Injectable({providedIn: 'root'})
export class AuthenticationService {
  private userLoginError = new Subject<Errors>();
  private userIsAuth = false;
  private static userAuthToken: UserAuthToken;
  private userExpirationTimer: NodeJS.Timer;

  constructor(private apollo: Apollo, private loginGqlService: LoginGqlService, private signupGqlService: SignupGqlService, private router: Router) {
  }

  userSignup(email: string, username: string, password: string, confirmPassword: string) {
    const userSignupData: UserSignUp = {
      email: email,
      username: username,
      password: password,
      confirmPassword: confirmPassword
    };

    return this.signupGqlService.mutate({
      userSignUpData: userSignupData
    }).pipe(
      (map(response => {
        return {...response.data}
      })),
      // @ts-ignore
      catchError(err => {
        console.log(err)
      }))
  }

  userLogin(email: string, password: string) {
    const userLoginData: UserLogin = {
      email: email,
      password: password,
    };

    this.loginGqlService.watch({
      userLoginData: userLoginData,
    }).valueChanges.pipe(
      (map(response => {
        return {...response.data}
      })),
      // @ts-ignore
      catchError(err => {
        console.log(err)
      })
    ).subscribe((response) => {
      const ok = response.userLogin.ok;
      const data = response.userLogin.data;
      const errors = response.userLogin.errors;
      if (!ok) {
        this.userLoginError.next([...errors]);
      }
      if (ok && data && data.token) {
        this.userLoginError.next([]);
        AuthenticationService.userAuthToken = data.token;
        this.setUserExpirationTimer(data.expiresIn);
        this.storeAuthToken(data.token, data.token);
        this.userIsAuth = true;
      }
    })
  }

  getUserIsAuth() {
    return this.userIsAuth;
  }

  getUserLoginError() {
    return this.userLoginError.asObservable();
  }

  userLogout(){
    clearTimeout(this.userExpirationTimer);
    this.removeAuthToken();
    this.userIsAuth = false;
    this.apollo.client.resetStore();
    this.router.navigate(['/login']);
  }

  static getUserAuthToken() {
    return localStorage.getItem('token');
  }

  private setUserExpirationTimer(duration: number){
    this.userExpirationTimer = setTimeout(()=>{
      this.userLogout();
    }, duration*1000);
  }

  private storeAuthToken(token: string, expirationDate: Date) {
    localStorage.setItem('token', token);
  }

  private removeAuthToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }
}
