import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from "rxjs";

import {authenticationValidator} from '../../shared/authentication/authentication.validator';
import {AuthenticationService} from '../../shared/authentication/authentication.service';
import {Error} from "../../shared/error/error.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignUpComponent implements OnInit {
  title = 'chatty';
  signupForm: FormGroup;
  focusControl: string | undefined;
  usernameError: Error | null = null;
  emailError: Error | null = null;
  passwordError: Error | null = null;
  confirmPasswordError: Error | null = null;
  accountError: Error | null = null;


  constructor(private authService: AuthenticationService, private router: Router) {
  }

  ngOnInit() {
    this.signupForm = new FormGroup({
      'username': new FormControl(null, [Validators.required, Validators.minLength(6), Validators.pattern('^[a-zA-Z]{6,18}$')]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\\W).{8,32}$')]),
      'confirmPassword': new FormControl(null, [Validators.required])
    }, {
      validators: authenticationValidator('password', 'confirmPassword')
    });
  }

  onSignup() {
    if (this.signupForm.invalid) {
      return;
    }
    this.authService.userSignup(this.signupForm.value.email, this.signupForm.value.username, this.signupForm.value.password, this.signupForm.value.confirmPassword).subscribe((response) => {
      const ok = response.userSignUp.ok;
      const data = response.userSignUp.data;
      const errors = response.userSignUp.errors;
      if (!ok) {
        errors.map((item: Error) => {
          if (item.type === 'username') {
            this.usernameError = item;
          }

          if (item.type === 'email') {
            this.emailError = item;
          }

          if (item.type === 'password') {
            this.passwordError = item;
          }

          if (item.type === 'confirmPassword') {
            this.confirmPasswordError = item;
          }

          if (item.type === 'account') {
            this.accountError = item;
          }
        })
      }
      if (ok) {
        this.resetAllErrors();
        this.router.navigate(['login']);
      }
    })
  }

  onFocus(event: any) {
    if (event.target.attributes.formControlName.value === 'password') {
      this.focusControl = 'password'
    } else if (event.target.attributes.formControlName.value === 'username') {
      this.focusControl = 'username'
    } else if (event.target.attributes.formControlName.value === 'email') {
      this.focusControl = 'email'
    } else if (event.target.attributes.formControlName.value === 'confirmPassword') {
      this.focusControl = 'confirmPassword'
    } else {
      this.focusControl = undefined
    }
  }

  resetAllErrors() {
    this.usernameError = null;
    this.emailError = null;
    this.passwordError = null;
    this.confirmPasswordError = null;
    this.accountError = null;
  }

  ngOnDestroy() {

  }
}
