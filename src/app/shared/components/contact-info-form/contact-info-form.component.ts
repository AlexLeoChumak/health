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
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonSelect,
  IonSelectOption,
  IonDatetime,
  IonPopover,
  IonText,
  IonNote,
  IonItemGroup,
  IonItemDivider,
  IonList,
  IonRadio,
  IonRadioGroup,
  IonListHeader,
  IonCheckbox,
} from '@ionic/angular/standalone';

import { DatepickerComponent } from 'src/app/shared/components/datepicker/datepicker.component';
import { ValidatorFormControlComponent } from 'src/app/shared/components/validator-form-control/validator-form-control.component';
import { FORM_VALIDATION_ERROR_MESSAGES } from 'src/app/features/auth/constants/form-validation-error-messages.constant';

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
    IonCheckbox,
    IonListHeader,
    IonRadioGroup,
    IonRadio,
    IonList,
    IonItemDivider,
    IonItemGroup,
    IonNote,
    IonPopover,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonSelect,
    IonSelectOption,
    IonDatetime,
    IonText,
    DatepickerComponent,
    ValidatorFormControlComponent,
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
      mobilePhoneNumber: new FormControl(null, [Validators.required]),
      homePhoneNumber: new FormControl(null),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
    });

    this.formReady.emit(this.contactInfoFormGroup);
  }
}
