import {Injectable} from '@angular/core';
import {AuthModel} from '../models/auth.model';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../../environments/environment";

@Injectable({providedIn: 'root'})
export class AuthService {
  constructor(private http: HttpClient) {
  }

  userCreate(email: string, username: string, password: string, confirmPassword: string) {
    const userAuthData: AuthModel = {
      email: email,
      username: username,
      password: password,
      confirmPassword: confirmPassword
    };

    this.http.post(environment.apiURL + 'signup', userAuthData)
      .subscribe(response => {
        console.log(response);
      })

  }
}
