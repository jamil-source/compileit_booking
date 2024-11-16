import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function specialCharactersValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    const regex = /^[a-zA-ZåäöÅÄÖ\- ]*$/;

    if (value && !regex.test(value)) {
      return { invalidCharacters: true };
    }
    return null;
  };
}
