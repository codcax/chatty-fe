import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {passwordValidator} from './password.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignUpComponent implements OnInit {
  title = 'chatty';
  signupForm: FormGroup;
  focusControl: string | undefined;

  ngOnInit() {
    this.signupForm = new FormGroup({
      'username': new FormControl(null, [Validators.required, Validators.minLength(6), Validators.pattern('^[a-zA-Z]{6,18}$')]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\\W).{8,32}$')]),
      'confirm-password': new FormControl(null, [Validators.required])
    }, {
      validators: passwordValidator('password', 'confirm-password')
    });
  }

  onSubmit() {
    console.log(this.signupForm)
  }

  onFocus(event: any) {
    if (event.target.attributes.formControlName.value === 'password') {
      this.focusControl = 'password'
    } else if (event.target.attributes.formControlName.value === 'username') {
      this.focusControl = 'username'
    } else {
      this.focusControl = undefined
    }
  }
}
