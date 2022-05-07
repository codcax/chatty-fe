import {Injectable} from '@angular/core';
import {UserCreate, UserLogin} from './auth.model';
import {Apollo, gql} from 'apollo-angular';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../environments/environment";

const userLogin = gql`
  query userLogin($userLoginData: userLogin!) {
    userLogin (input: $userLoginData){
      _id
    }
  }
`;

@Injectable({providedIn: 'root'})
export class AuthService {
  constructor(private http: HttpClient, private apollo: Apollo) {
  }

  userCreate(email: string, username: string, password: string, confirmPassword: string) {
    const userCreateData: UserCreate = {
      email: email,
      username: username,
      password: password,
      confirmPassword: confirmPassword
    };

    this.http.post(environment.apiURL + 'signup', userCreateData)
      .subscribe(response => {
        console.log(response);
      })
  }

  userLogin(email: string, password: string) {
    const userLoginData: UserLogin = {
      email: email,
      password: password,
    };

    this.apollo.watchQuery<any>({
      query: userLogin,
      variables: {
        userLoginData: userLoginData
      }
    }).valueChanges.subscribe((result) => {
      console.log(result)
    })
  }
}
