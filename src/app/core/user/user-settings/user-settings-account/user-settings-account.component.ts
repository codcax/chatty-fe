import { Component, OnInit } from '@angular/core';
import {Subscription, take} from "rxjs";
import {User} from "../../../../shared/user/user.model";
import {UserService} from "../../../../shared/user/user.service";

@Component({
  selector: 'app-user-settings-account',
  templateUrl: './user-settings-account.component.html',
  styleUrls: ['./user-settings-account.component.css']
})
export class UserSettingsAccountComponent implements OnInit {

  private getUser: Subscription;
  user: User;
  activeSubModal: string;

  constructor(private userServiceShared: UserService) {
  }

  ngOnInit() {
    this.userServiceShared.fetchUser();
    this.getUser = this.userServiceShared.getUser().subscribe((user) => {
      this.user = user;
    })
  }

  ngOnDestroy(){
    this.getUser.unsubscribe();
  }
}
