import { FormGroup } from '@angular/forms';

export function checkInputValidatorUtility(
  formGroup: FormGroup,
  controlName: string,
  validator: string
): boolean {
  const control = formGroup.get(controlName);
  return (
    !!control &&
    control.invalid &&
    control.touched &&
    !!control.errors?.[validator]
  );
}
