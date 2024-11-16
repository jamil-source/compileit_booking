import { AbstractControl, ValidationErrors } from '@angular/forms';

export function specialCharactersValidator(): ValidationErrors | null {
  const regex = /^[a-zA-Z\s\-]+$/;

  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (value && !regex.test(value)) {
      return { specialCharacters: true };
    }
    return null;
  };
}
