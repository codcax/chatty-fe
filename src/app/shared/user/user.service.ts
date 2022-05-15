import {Injectable} from '@angular/core';
import {BehaviorSubject, catchError, map, Subject} from "rxjs";

import {User} from "./user.model";
import {Errors} from "../error/error.model";

import {Apollo} from 'apollo-angular';
import {UserGqlService} from '../../graphql/user/user-gql.service';

@Injectable({providedIn: 'root'})
export class UserService {
  private user = new Subject<User>();

  constructor(private apollo: Apollo, private userGqlService: UserGqlService) {
  }

  fetchUser() {
    this.userGqlService.watch({})
      .valueChanges
      .pipe(
        (map(response => {
            return {...response.data}
          })
        ),
        //@ts-ignore
        catchError(err => {
          console.log(err)
        })
      ).subscribe((response) => {
      const ok = response.getUser.ok;
      const data = response.getUser.data;
      const errors = response.getUser.errors;
      if (!ok) {
        return errors;
      }
      if (ok && data){
        this.user.next({...data});
      }
    })
  }

  getUser(){
    return this.user.asObservable();
  }
}
