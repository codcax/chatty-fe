import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {User} from '../../../../shared/user/user.model';
import {UserService} from '../../../../shared/user/user.service';
import {Error} from '../../../../shared/error/error.model';
import {UserSettingsService} from '../user-settings.service';

@Component({
  selector: 'app-user-settings-account',
  templateUrl: './user-settings-account.component.html',
  styleUrls: ['./user-settings-account.component.css']
})
export class UserSettingsAccountComponent implements OnInit {
  updateUsernameForm: FormGroup;
  updateEmailForm: FormGroup;
  updatePasswordForm: FormGroup;
  focusControl: string | undefined;
  editUsernameModalUsernameError: Error | null = null;
  editUsernameModalPasswordError: Error | null = null;
  editEmailModalEmailError: Error | null = null;
  editEmailModalPasswordError: Error | null = null;
  editPasswordModalNewPasswordError: Error | null = null;
  editPasswordModalConfirmPasswordError: Error | null = null;
  editPasswordModalPasswordError: Error | null = null;

  private getUser: Subscription;
  user: User;
  activeSubModal: string;
  editUsernameModalState: string = 'close';
  editEmailModalState: string = 'close';
  editPasswordModalState: string = 'close';


  constructor(private userServiceShared: UserService, private userSettingsService: UserSettingsService) {
  }

  ngOnInit() {
    this.fetchUserData()
  }

  fetchUserData() {
    this.userServiceShared.fetchUser();
    this.getUser = this.userServiceShared.getUser().subscribe((user) => {
      this.user = user;
      this.newUpdateUsernameForm();
      this.newUpdateEmailForm();
      this.newUpdatePasswordForm();
    })
  }

  openEditUsernameModal() {
    this.editUsernameModalState = 'open';
  }

  openEditEmailModal() {
    this.editEmailModalState = 'open';
  }

  openEditPasswordModal() {
    this.editPasswordModalState = 'open';
  }

  closeEditUsernameModal() {
    this.editUsernameModalState = 'close';
    this.resetAllForms();
    this.resetAllFormsErrors()
  }

  closeEditEmailModal() {
    this.editEmailModalState = 'close';
    this.resetAllForms();
    this.resetAllFormsErrors()
  }

  closeEditPasswordModal() {
    this.editPasswordModalState = 'close';
    this.resetAllForms();
    this.resetAllFormsErrors()
  }

  newUpdateUsernameForm() {
    this.updateUsernameForm = new FormGroup({
      'username': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required]),
    });
    this.updateUsernameForm.get('username')?.setValue(this.user.username);
  }

  newUpdateEmailForm() {
    this.updateEmailForm = new FormGroup({
      'email': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required]),
    });
    this.updateEmailForm.get('email')?.setValue(this.user.email);
  }

  newUpdatePasswordForm() {
    this.updatePasswordForm = new FormGroup({
      'newPassword': new FormControl(null, [Validators.required]),
      'confirmPassword': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required]),
    });
    this.updatePasswordForm.get('newPassword')?.setValue('');
    this.updatePasswordForm.get('confirmPassword')?.setValue('');
    this.updatePasswordForm.get('password')?.setValue('');
  }

  onUpdateUsername() {
    if (this.updateUsernameForm.invalid) {
      return;
    }
    this.userSettingsService.updateUsername(this.updateUsernameForm.value.username, this.updateUsernameForm.value.password)
      .subscribe((response) => {
        this.resetAllFormsErrors();
        const ok = response.updateUsername.ok;
        const data = response.updateUsername;
        const errors = response.updateUsername.errors;
        if (!ok) {
          errors.map((item: Error) => {
            if (item.type === 'username') {
              this.editUsernameModalUsernameError = item;
            }

            if (item.type === 'authenticate') {
              this.editUsernameModalPasswordError = item;
            }
          })
        }
        if (ok) {
          this.resetAllFormsErrors();
          this.updateUsernameForm.get('password')?.setValue('');
        }
      });
  }

  onUpdateEmail() {
    if (this.updateEmailForm.invalid) {
      return;
    }
    this.userSettingsService.updateEmail(this.updateEmailForm.value.email, this.updateEmailForm.value.password)
      .subscribe((response) => {
        this.resetAllFormsErrors();
        const ok = response.updateEmail.ok;
        const data = response.updateEmail;
        const errors = response.updateEmail.errors;
        if (!ok) {
          errors.map((item: Error) => {
            if (item.type === 'email') {
              this.editEmailModalEmailError = item;
            }

            if (item.type === 'authenticate') {
              this.editEmailModalPasswordError = item;
            }
          })
        }
        if (ok) {
          this.resetAllFormsErrors();
          this.updateEmailForm.get('password')?.setValue('');
        }
      });
  }

  onUpdatePassword() {
    if (this.updatePasswordForm.invalid) {
      return;
    }
    this.userSettingsService.updatePassword(this.updatePasswordForm.value.newPassword, this.updatePasswordForm.value.confirmPassword, this.updatePasswordForm.value.password)
      .subscribe((response) => {
        this.resetAllFormsErrors();
        const ok = response.updatePassword.ok;
        const data = response.updatePassword;
        const errors = response.updatePassword.errors;
        if (!ok) {
          errors.map((item: Error) => {
            if (item.type === 'newPassword') {
              this.editPasswordModalNewPasswordError = item;
            }

            if (item.type === 'confirmPassword') {
              this.editPasswordModalConfirmPasswordError = item;
            }

            if (item.type === 'authenticate') {
              this.editPasswordModalPasswordError = item;
            }
          })
        }
        if (ok) {
          this.resetAllFormsErrors();
          this.updatePasswordForm.get('newPassword')?.setValue('');
          this.updatePasswordForm.get('confirmPassword')?.setValue('');
          this.updatePasswordForm.get('password')?.setValue('');
        }
      });
  }

  onFocus(event: any) {
    if (event.target.attributes.formControlName.value === 'newPassword') {
      this.focusControl = 'newPassword'
    } else {
      this.focusControl = undefined
    }
  }

  resetAllForms() {
    this.updateUsernameForm.reset();
    this.updateUsernameForm.get('username')?.setValue(this.user.username);
    this.updateEmailForm.reset();
    this.updateEmailForm.get('email')?.setValue(this.user.email);
    this.updatePasswordForm.reset();
  }

  resetAllFormsErrors() {
    this.editUsernameModalUsernameError = null;
    this.editUsernameModalPasswordError = null;
    this.editEmailModalEmailError = null;
    this.editEmailModalPasswordError = null;
    this.editPasswordModalNewPasswordError = null;
    this.editPasswordModalConfirmPasswordError = null;
    this.editPasswordModalPasswordError = null;
  }

  ngOnDestroy() {
    this.getUser.unsubscribe();
  }
}
