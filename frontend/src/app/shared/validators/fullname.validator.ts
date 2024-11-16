import { AbstractControl, ValidationErrors } from '@angular/forms';

export function fullNameValidator(): ValidationErrors | null {
  const regex = /^[a-zA-Z]+ [a-zA-Z]+$/;

  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (value && !regex.test(value)) {
      return { fullNameValidator: true };
    }

    return null;
  };
}
