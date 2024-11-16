import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function fullNameValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) {
      return { required: true };
    }

    const regex = /^[a-zA-ZåäöÅÄÖ]+ [a-zA-ZåäöÅÄÖ]+$/;

    if (!regex.test(value.trim())) {
      return { invalidFullName: true };
    }

    return null;
  };
}
