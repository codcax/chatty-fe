import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {authValidator} from '../auth.validator';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignUpComponent implements OnInit {
  title = 'chatty';
  signupForm: FormGroup;
  focusControl: string | undefined;

  constructor(public authService: AuthService) {
  }

  ngOnInit() {
    this.signupForm = new FormGroup({
      'username': new FormControl(null, [Validators.required, Validators.minLength(6), Validators.pattern('^[a-zA-Z]{6,18}$')]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\\W).{8,32}$')]),
      'confirmPassword': new FormControl(null, [Validators.required])
    }, {
      validators: authValidator('password', 'confirmPassword')
    });
  }

  onSignup() {
    if (this.signupForm.invalid) {
      return;
    }
    this.authService.userSignup(this.signupForm.value.email, this.signupForm.value.username, this.signupForm.value.password, this.signupForm.value.confirmPassword);
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
}
