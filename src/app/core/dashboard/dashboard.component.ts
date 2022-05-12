import { Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";

import {AuthenticationService} from '../../shared/authentication/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private userAuthToken: Subscription;

  constructor(private authService: AuthenticationService ) {}

  ngOnInit() {
    this.userAuthToken = this.authService.getUserAuthToken().subscribe(authToken =>{
      console.log(authToken)
    })
  }

  ngOnDestroy(){
    this.userAuthToken.unsubscribe();
  }
}
