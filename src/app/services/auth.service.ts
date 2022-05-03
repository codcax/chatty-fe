import {Injectable} from '@angular/core';
import {UserCreate, UserLogin} from '../models/auth.model';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../environments/environment";

@Injectable({providedIn: 'root'})
export class AuthService {
  constructor(private http: HttpClient) {
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
    this.http.post(environment.apiURL + 'login', userLoginData)
      .subscribe(response => {
        console.log(response);
      })

  }
}
