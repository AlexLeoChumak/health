import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  input,
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
  IonSelect,
  IonSelectOption,
  IonNote,
  IonItemGroup,
} from '@ionic/angular/standalone';

import { ErrorNotificationComponent } from 'src/app/shared/components/error-notification/error-notification.component';
import { checkInputValidatorUtility } from 'src/app/shared/utils/check-input-validator.utility';
import { FORM_VALIDATION_ERROR_MESSAGES } from 'src/app/features/auth/constants/form-validation-error-messages.constant';
import { NumericInputRestrictionDirective } from 'src/app/shared/directives/numeric-input-restriction.directive';

type addressPropsType =
  | 'Адрес регистрации'
  | 'Адрес фактического проживания'
  | 'Адрес места работы';

@Component({
  selector: 'health-address-info-form',
  templateUrl: './address-info-form.component.html',
  styleUrls: ['./address-info-form.component.scss'],
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
    IonSelect,
    IonSelectOption,
    ErrorNotificationComponent,
    NumericInputRestrictionDirective,
  ],
})
export class AddressInfoFormComponent implements OnInit {
  public readonly addressTypeProps = input<addressPropsType>();
  protected readonly formReady = output<FormGroup>();
  protected addressInfoFormGroup!: FormGroup;
  protected readonly formValidationErrorMessages =
    FORM_VALIDATION_ERROR_MESSAGES;
  protected readonly regions: string[] = [
    'Брестская область',
    'Витебская область',
    'Гомельская область',
    'Гродненская область',
    'Минская область',
    'Могилевская область',
  ];

  public ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    const minInputValue: number = 1;
    const maxInputValue: number = 99999;

    this.addressInfoFormGroup = new FormGroup({
      region: new FormControl(null, [Validators.required]),
      district: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required]),
      street: new FormControl(null, [Validators.required]),
      house: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]*$'), // как уведомить об ошибке
        Validators.min(minInputValue),
        Validators.max(maxInputValue),
      ]),
      housing: new FormControl(null, [
        Validators.min(minInputValue),
        Validators.max(maxInputValue),
      ]),
      apartment: new FormControl(null, [
        Validators.min(minInputValue),
        Validators.max(maxInputValue),
      ]),
    });

    this.formReady.emit(this.addressInfoFormGroup);
  }

  protected checkInputValidator(
    formGroup: FormGroup,
    controlName: string,
    validator: string
  ): boolean {
    return checkInputValidatorUtility(formGroup, controlName, validator);
  }
}
