import {Injectable} from '@angular/core';
import {UserCreate, UserLogin} from './auth.model';
import {Apollo} from 'apollo-angular';
import {SignupGqlService} from "../graphql/auth/signup-gql.service";
import {LoginGqlService} from "../graphql/auth/login-gql.service";
import {catchError, map, Subject} from "rxjs";
import {subscribe} from "graphql";


@Injectable({providedIn: 'root'})
export class AuthService {
  private userLoginError = new Subject();
  private userSignUpError = new Subject();

  constructor(private apollo: Apollo, private loginGqlService: LoginGqlService, private signupGqlService: SignupGqlService) {
  }

  userSignup(email: string, username: string, password: string, confirmPassword: string) {
    const userSignupData: UserCreate = {
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
      })).subscribe(response => {
      const ok = response.userSignUp.ok;
      const data = response.userSignUp.data;
      const errors = response.userSignUp.errors;
      if (!ok) {
        this.userSignUpError.next([...errors]);
      }
      if (ok) {
        this.userSignUpError.next([]);
        console.log(data)
      }
    })
  }

  userLogin(email: string, password: string) {
    const userLoginData: UserLogin = {
      email: email,
      password: password,
    };

    // @ts-ignore
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
    ).subscribe(response => {
      const ok = response.userLogin.ok;
      const data = response.userLogin.data;
      const errors = response.userLogin.errors;
      if (!ok) {
        this.userLoginError.next([...errors]);
      }
      if (ok) {
        this.userLoginError.next([]);
        console.log(data)
      }
    })
  }

  getUserLoginError() {
    return this.userLoginError.asObservable();
  }

  getUserSignUpError() {
    return this.userSignUpError.asObservable();
  }
}
