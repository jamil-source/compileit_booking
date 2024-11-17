import { AbstractControl, ValidationErrors } from '@angular/forms';

export function fullNameValidator(): ValidationErrors | null {
  const regex =
    /^[a-zA-ZåäöÅÄÖ]+(?:[-'][a-zA-ZåäöÅÄÖ]+)*(?: [a-zA-ZåäöÅÄÖ]+(?:[-'][a-zA-ZåäöÅÄÖ]+)*)+\s*$/;

  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (value && !regex.test(value)) {
      return { fullNameValidator: true };
    }

    return null;
  };
}
