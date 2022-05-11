import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/authentication/auth.service";
import {Subscription} from "rxjs";
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

  constructor(private authService: AuthService) {
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
      this.errors = [];
      this.errorLogin(errors);
    });
  }

  errorLogin(errors: any) {
    if (errors.length > 0) {
      errors.map((err: any) => {
        this.errors.push(err.message)
      })
    } else {
      this.errors = [];
    }
  }

  ngOnDestroy() {
    this.errorLoginSub.unsubscribe();
  }
}
