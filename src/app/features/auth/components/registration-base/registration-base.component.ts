import { Component, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'health-registration-base',
  template: '',
})
export abstract class RegistrationBaseComponent {
  registrationForm!: FormGroup;
  isRegistrationAndResidenceAddressesMatch = signal<boolean>(false);

  initializeForm(): void {
    this.registrationForm = new FormGroup({
      user: new FormGroup({}),
    });
  }

  toggleCheckboxCopyRegistrationAddress(): void {
    this.isRegistrationAndResidenceAddressesMatch.update(
      (prevValue) => !prevValue
    );
    this.copyRegistrationAddressToResidenceAddress(
      this.isRegistrationAndResidenceAddressesMatch()
    );
  }

  copyRegistrationAddressToResidenceAddress(
    isRegistrationAndResidenceAddressesMatch: boolean
  ): void {
    if (isRegistrationAndResidenceAddressesMatch) {
      this.registrationForm
        .get('user.addressResidenceInfo')
        ?.patchValue(
          this.registrationForm.get('user.addressRegistrationInfo')?.value
        );
    } else {
      this.registrationForm.get('user.addressResidenceInfo')?.reset();
    }
  }

  addFormGroup(formGroupName: string, formGroup: FormGroup): void {
    const userGroup = this.registrationForm.get('user') as FormGroup;
    userGroup.addControl(formGroupName, formGroup);
  }
}
