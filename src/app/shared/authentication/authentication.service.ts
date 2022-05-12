import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {catchError, map, Subject} from "rxjs";

import {SignupGqlService} from '../../graphql/authentication/signup-gql.service';
import {LoginGqlService} from '../../graphql/authentication/login-gql.service';

import {UserSignUp, UserLogin, UserAuthToken} from './authentication.model';
import {Errors} from '../error/error.model';


@Injectable({providedIn: 'root'})
export class AuthenticationService {
  private userLoginError = new Subject<Errors>();
  private userSignUpError = new Subject<Errors>();
  private userIsAuth = false;
  private static userAuthToken: UserAuthToken;

  constructor(private apollo: Apollo, private loginGqlService: LoginGqlService, private signupGqlService: SignupGqlService) {
  }

  public userSignup(email: string, username: string, password: string, confirmPassword: string) {
    const userSignupData: UserSignUp = {
      email: email,
      username: username,
      password: password,
      confirmPassword: confirmPassword
    };

    this.signupGqlService.mutate({
      userSignUpData: userSignupData
    }).pipe(
      (map(response => {
        return {...response.data}
      })),
      // @ts-ignore
      catchError(err => {
        console.log(err)
      })).subscribe((response) => {
      const ok = response.userSignUp.ok;
      const data = response.userSignUp.data;
      const errors = response.userSignUp.errors;
      if (!ok) {
        this.userSignUpError.next([...errors]);
      }
      if (ok) {
        this.userSignUpError.next([]);
      }
    })
  }

  public userLogin(email: string, password: string) {
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
      if (ok) {
        this.userLoginError.next([]);
        AuthenticationService.userAuthToken = data.token;
        this.userIsAuth = true;
      }
    })
  }

  public getUserIsAuth() {
    return this.userIsAuth;
  }

  public getUserLoginError() {
    return this.userLoginError.asObservable();
  }

  public getUserSignUpError() {
    return this.userSignUpError.asObservable();
  }

  public static getUserAuthToken() {
    return this.userAuthToken;
  }
}
