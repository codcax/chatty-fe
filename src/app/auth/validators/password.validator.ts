import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';

export function passwordValidator(controlPassword: string, controlConfirmPassword: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const formGroup = control as FormGroup;
    const password = formGroup.get(controlPassword)?.value;
    const confirmPassword = formGroup.get(controlConfirmPassword)?.value;


    if (password === confirmPassword) {
      return null
    } else {
      return {valuesDoNotMatch: true}
    }
  }
}

