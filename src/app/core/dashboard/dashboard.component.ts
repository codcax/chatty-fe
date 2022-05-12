import {Component, OnInit} from '@angular/core';

import {AuthenticationService} from '../../shared/authentication/authentication.service';
import {UserAuthToken} from "../../shared/authentication/authentication.model";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private userAuthToken: UserAuthToken

  constructor(private authService: AuthenticationService) {
  }

  ngOnInit() {
    this.userAuthToken = AuthenticationService.getUserAuthToken()
    console.log(this.userAuthToken)
  }
}
