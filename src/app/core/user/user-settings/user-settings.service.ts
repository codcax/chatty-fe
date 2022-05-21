import {Injectable} from '@angular/core';
import {Observable, BehaviorSubject, Subject, map, catchError} from 'rxjs';
import {Apollo} from 'apollo-angular';

import {UpdateUsername, UpdateEmail} from '../../../shared/user/user.model';
import {Errors} from '../../../shared/error/error.model';
import {UpdateUsernameGqlService, UpdateEmailGqlService} from '../../../graphql/user/user-gql.service';


@Injectable({providedIn: 'root'})
export class UserSettingsService {
  modalState: BehaviorSubject<'open' | 'close'> = new BehaviorSubject<'open' | 'close'>('close');
  private error = new Subject<Errors>();

  constructor(private apollo: Apollo, private updateUsernameGqlService: UpdateUsernameGqlService, private updateEmailGqlService: UpdateEmailGqlService) {
  }

  openModal() {
    this.modalState.next('open');
  }

  watchModal(): Observable<'open' | 'close'> {
    return this.modalState.asObservable();
  }

  closeModal() {
    this.modalState.next('close');
  }

  updateUsername(username: string, password: string){
    const updateUsernameData: UpdateUsername ={
      newUsername: username,
      password: password
    };

    return this.updateUsernameGqlService.mutate({
      updateUsernameData: updateUsernameData
    }).pipe(
      (map(response => {
        return {...response.data}
      })),
      // @ts-ignore
      catchError(err => {
        console.log(err)
      }))
  }

  updateEmail(email: string, password: string){
    const updateEmailData: UpdateEmail ={
      newEmail: email,
      password: password
    };

    return this.updateEmailGqlService.mutate({
      updateEmailData: updateEmailData
    }).pipe(
      (map(response => {
        return {...response.data}
      })),
      // @ts-ignore
      catchError(err => {
        console.log(err)
      }))
  }
}
