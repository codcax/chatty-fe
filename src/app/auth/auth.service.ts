import {Injectable} from '@angular/core';
import {UserCreate, UserLogin} from './auth.model';
import {Apollo} from 'apollo-angular';
import {SignupGqlService} from "../graphql/auth/signup-gql.service";
import {LoginGqlService} from "../graphql/auth/login-gql.service";


@Injectable({providedIn: 'root'})
export class AuthService {
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
      userCreateData: userSignupData
    }).subscribe(result => {
      console.log(result)
    })
  }

  userLogin(email: string, password: string) {
    const userLoginData: UserLogin = {
      email: email,
      password: password,
    };

    this.loginGqlService.watch({
      userLoginData: userLoginData
    }).valueChanges.subscribe((result) => {
      console.log(result)
    })
  }
}
