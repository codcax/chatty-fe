import {Injectable} from '@angular/core';
import {Observable, BehaviorSubject} from 'rxjs';

@Injectable({providedIn: 'root',})
export class UserSettingsService {
  modalState: BehaviorSubject<'open' | 'close'> = new BehaviorSubject<'open' | 'close'>('close');

  openModal() {
    this.modalState.next('open');
  }

  watchModal(): Observable<'open' | 'close'> {
    return this.modalState.asObservable();
  }

  closeModal() {
    this.modalState.next('close');
  }
}
