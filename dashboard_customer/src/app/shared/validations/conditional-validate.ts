import { AbstractControl } from '@angular/forms';

export function ConditionalValidate(condition: any) {
  return (control: AbstractControl) => {
    if (control.value === condition) {
      return { validUrl: true };
    }
    return null;
  }
}
