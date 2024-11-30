import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  output,
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  IonItem,
  IonLabel,
  IonInput,
  IonNote,
  IonItemGroup,
} from '@ionic/angular/standalone';

import { ValidatorFormControlComponent } from 'src/app/shared/components/validator-form-control/validator-form-control.component';
import { FORM_VALIDATION_ERROR_MESSAGES } from 'src/app/features/auth/constants/form-validation-error-messages.constant';
import { checkInputValidatorUtility } from 'src/app/shared/utils/check-input-validator.utility';
import { ErrorNotificationComponent } from 'src/app/shared/components/error-notification/error-notification.component';
import { PhonePrefixFormatterDirective } from 'src/app/features/auth/directives/phone-prefix-formatter.directive';

@Component({
  selector: 'health-contact-info-form',
  templateUrl: './contact-info-form.component.html',
  styleUrls: ['./contact-info-form.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonItemGroup,
    IonNote,
    IonItem,
    IonLabel,
    IonInput,
    ValidatorFormControlComponent,
    ErrorNotificationComponent,
    PhonePrefixFormatterDirective,
  ],
})
export class ContactInfoFormComponent implements OnInit {
  formReady = output<FormGroup>();

  contactInfoFormGroup!: FormGroup;
  FORM_VALIDATION_ERROR_MESSAGES = FORM_VALIDATION_ERROR_MESSAGES;

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.contactInfoFormGroup = new FormGroup({
      mobilePhoneNumber: new FormControl(null, [
        Validators.required,
        Validators.minLength(17),
      ]),
      homePhoneNumber: new FormControl(null),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
    });

    this.formReady.emit(this.contactInfoFormGroup);
  }

  checkInputValidator(
    formGroup: FormGroup,
    controlName: string,
    validator: string
  ): boolean {
    return checkInputValidatorUtility(formGroup, controlName, validator);
  }
}
