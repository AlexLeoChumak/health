import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  output,
  signal,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  IonItemGroup,
  IonItemDivider,
  IonItem,
  IonLabel,
  IonInput,
  IonNote,
  IonRadioGroup,
  IonRadio,
  IonButton,
} from '@ionic/angular/standalone';

import { DatepickerComponent } from 'src/app/shared/components/datepicker/datepicker.component';
import { ValidatorFormControlComponent } from 'src/app/shared/components/validator-form-control/validator-form-control.component';
import { FORM_VALIDATION_ERROR_MESSAGES } from 'src/app/features/auth/constants/form-validation-error-messages.constant';
import { IdentificationInfoFormForForeignCitizensComponent } from 'src/app/shared/components/identification-info-form/identification-info-form-for-foreign-citizens/identification-info-form-for-foreign-citizens.component';
import { IdentificationInfoFormForCitizensBelarusComponent } from 'src/app/shared/components/identification-info-form/identification-info-form-for-citizens-belarus/identification-info-form-for-citizens-belarus.component';

@Component({
  selector: 'health-identification-info-form',
  templateUrl: './identification-info-form.component.html',
  styleUrls: ['./identification-info-form.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonButton,
    FormsModule,
    ReactiveFormsModule,
    IonRadio,
    IonRadioGroup,
    IonItemGroup,
    IonItemDivider,
    IonItem,
    IonLabel,
    IonInput,
    IonNote,
    DatepickerComponent,
    ValidatorFormControlComponent,
    IdentificationInfoFormForForeignCitizensComponent,
    IdentificationInfoFormForCitizensBelarusComponent,
  ],
})
export class IdentificationInfoFormComponent implements OnInit {
  formReady = output<FormGroup>();

  identificationInfoFormGroup!: FormGroup;
  userCitizenshipSignal = signal<string>('Республика Беларусь');
  FORM_VALIDATION_ERROR_MESSAGES = FORM_VALIDATION_ERROR_MESSAGES;

  constructor() {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.identificationInfoFormGroup = new FormGroup({
      userCitizenship: new FormControl('Республика Беларусь', [
        Validators.required,
      ]),
    });

    this.formReady.emit(this.identificationInfoFormGroup);
  }

  updateCitizenshipSignal(value: string): void {
    this.clearFormControls();
    this.userCitizenshipSignal.set(value);
    this.identificationInfoFormGroup.get('userCitizenship')?.setValue(value);
  }

  addControls(controls: Record<string, FormControl>): void {
    Object.keys(controls).forEach((key) => {
      this.identificationInfoFormGroup.addControl(key, controls[key]);
    });
  }

  clearFormControls(): void {
    Object.keys(this.identificationInfoFormGroup.controls).forEach(
      (controlName) => {
        if (controlName !== 'userCitizenship') {
          this.identificationInfoFormGroup.removeControl(controlName);
        }
      }
    );
  }
}
