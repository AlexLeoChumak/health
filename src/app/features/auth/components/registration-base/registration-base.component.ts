import {
  Component,
  inject,
  signal,
  OnDestroy,
  WritableSignal,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/features/auth/services/auth.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { DoctorRequestInterface } from 'src/app/shared/models/doctor.interface';
import { PatientRequestInterface } from 'src/app/shared/models/patient.interface';
import { RegistrationResponseInterface } from 'src/app/features/auth/models/registration-response.interface';

@Component({
  selector: 'health-registration-base',
  template: '',
})
export abstract class RegistrationBaseComponent implements OnDestroy {
  private authService: AuthService = inject(AuthService);
  private toastService: ToastService = inject(ToastService);

  registrationForm!: FormGroup;
  isRegistrationAndResidenceAddressesMatch: WritableSignal<boolean> =
    signal<boolean>(false);
  private registrationSubscription!: Subscription;

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

  onSubmitForm(): void {
    const userData: PatientRequestInterface | DoctorRequestInterface =
      this.registrationForm.value;

    this.registrationSubscription = this.authService
      .registration(userData)
      .subscribe({
        next: (res: RegistrationResponseInterface) => {
          this.toastService.presentToast(res.message);
        },
      });
  }

  ngOnDestroy(): void {
    this.registrationSubscription
      ? this.registrationSubscription.unsubscribe()
      : null;
  }
}
