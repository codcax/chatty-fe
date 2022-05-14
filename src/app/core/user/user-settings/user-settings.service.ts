import {Injectable} from '@angular/core';
import {Observable, BehaviorSubject} from 'rxjs';

@Injectable({providedIn: 'root',})
export class UserSettingsService {
  modalState: BehaviorSubject<'open' | 'close'> = new BehaviorSubject<'open' | 'close'>('close');

  openModal() {
    console.log('open')
    this.modalState.next('open');
  }

  watchModal(): Observable<'open' | 'close'> {
    return this.modalState.asObservable();
  }

  closeModal() {
    console.log('close')
    this.modalState.next('close');
  }
}
