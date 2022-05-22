import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {UserSettingsService} from "./user-settings.service";

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {

  modalState: Observable<'open' | 'close'>;
  activeSubModal: string | 'userSettingsAccount';

  constructor(private userSettingsService: UserSettingsService) {
  }

  ngOnInit(){
    this.modalState = this.userSettingsService.watchModal();
    this.activeSubModal = 'userSettingsAccount';
  }

  closeModal(){
    this.userSettingsService.closeModal();
    this.activeSubModal = 'close'
  }
}
