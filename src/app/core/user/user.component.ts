import {Component, OnInit} from '@angular/core';
import {UserSettingsService} from "./user-settings/user-settings.service";
import {Observable, Subscription, take} from 'rxjs';

import {UserService} from '../../shared/user/user.service'
import {User} from '../../shared/user/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  private getUser: Subscription;
  user: User;

  constructor(private userSettingsService: UserSettingsService, private userServiceShared: UserService) {
  }

  ngOnInit() {
    this.userServiceShared.fetchUser();
    this.getUser = this.userServiceShared.getUser().pipe(take(1)).subscribe((user) => {
      this.user = user;
    })
  }

  openUserSettingsModal() {
    this.userSettingsService.openModal();
  }

  ngOnDestroy() {
    this.getUser.unsubscribe();
  }
}
