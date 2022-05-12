import { Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";

import {AuthService} from '../../shared/authentication/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private userAuthToken: Subscription;

  constructor(private authService: AuthService ) {}

  ngOnInit() {
    this.userAuthToken = this.authService.getUserAuthToken().subscribe(authToken =>{
      console.log(authToken)
    })
  }

  ngOnDestroy(){
    this.userAuthToken.unsubscribe();
  }
}
