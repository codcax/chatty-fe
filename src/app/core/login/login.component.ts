import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

import {AuthService} from "../../shared/authentication/auth.service";
import {Errors} from "../../shared/error/error.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'chatty';
  loginForm: FormGroup;
  errors: Errors = [];
  private errorLoginSub: Subscription;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, Validators.required),
    });
  }

  onLogin() {
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.userLogin(this.loginForm.value.email, this.loginForm.value.password);
    this.errorLoginSub = this.authService.getUserLoginError().subscribe((errors: any) => {
      this.errorLogin(errors);
    });
  }

  errorLogin(errors: any) {
    if (errors.length > 0) {
      this.errors = errors;
      this.errorLoginSub.unsubscribe();
    } else {
      this.errors = [];
      this.router.navigate(['/']);
    }
  }

  ngOnDestroy() {
    this.errorLoginSub.unsubscribe();
  }
}
