import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
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

import { ValidatorFormControlComponent } from 'src/app/shared/components/validator-form-control/validator-form-control.component';
import { FORM_VALIDATION_ERROR_MESSAGES } from 'src/app/features/auth/constants/form-validation-error-messages.constant';

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
    ValidatorFormControlComponent,
  ],
})
export class AddressInfoFormComponent implements OnInit {
  @Input() addressTypeProps: string = '';
  @Input() showFieldApartmentProps: boolean = true;
  @Output() formReady = new EventEmitter<FormGroup>();

  addressInfoFormGroup!: FormGroup;
  FORM_VALIDATION_ERROR_MESSAGES = FORM_VALIDATION_ERROR_MESSAGES;
  regions: string[] = [
    'Брестская область',
    'Витебская область',
    'Гомельская область',
    'Гродненская область',
    'Минская область',
    'Могилевская область',
  ];

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.addressInfoFormGroup = new FormGroup({
      region: new FormControl(null, [Validators.required]),
      district: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required]),
      street: new FormControl(null, [Validators.required]),
      house: new FormControl(null, [Validators.required]),
      housing: new FormControl(null),
      apartment: new FormControl(null),
    });

    this.formReady.emit(this.addressInfoFormGroup);
  }
}
