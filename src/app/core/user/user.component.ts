import {Component, OnInit} from '@angular/core';
import {UserSettingsService} from "./user-settings/user-settings.service";
import {Observable} from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private userSettingsService: UserSettingsService) {
  }

  ngOnInit() {
  }

  openUserSettingsModal() {
    this.userSettingsService.openModal();
  }
}
