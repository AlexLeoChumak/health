import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  output,
} from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import {
  IonItemGroup,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonInput,
} from '@ionic/angular/standalone';

import { FORM_VALIDATION_ERROR_MESSAGES } from 'src/app/features/auth/constants/form-validation-error-messages.constant';
import { ErrorNotificationComponent } from 'src/app/shared/components/error-notification/error-notification.component';
import { AddressInfoFormComponent } from 'src/app/shared/components/address-info-form/address-info-form.component';
import { ValidatorFormControlComponent } from 'src/app/shared/components/validator-form-control/validator-form-control.component';

@Component({
  selector: 'health-place-work-info-form',
  templateUrl: './place-work-info-form.component.html',
  styleUrls: ['./place-work-info-form.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    IonItemGroup,
    IonItem,
    IonItemDivider,
    IonLabel,
    IonInput,
    ErrorNotificationComponent,
    AddressInfoFormComponent,
    ValidatorFormControlComponent,
  ],
})
export class PlaceWorkInfoFormComponent implements OnInit {
  formReady = output<FormGroup>();
  placeWorkInfoFormGroup!: FormGroup;
  FORM_VALIDATION_ERROR_MESSAGES = FORM_VALIDATION_ERROR_MESSAGES;

  constructor() {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.placeWorkInfoFormGroup = new FormGroup({
      nameMedicalInstitution: new FormControl(null, [Validators.required]),
      department: new FormControl(null, [Validators.required]),
      currentSpecialization: new FormControl(null, [Validators.required]),
    });

    this.formReady.emit(this.placeWorkInfoFormGroup);
  }
}
