import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonNote,
  IonItemGroup,
  IonRadio,
  IonRadioGroup,
  IonThumbnail,
  IonImg,
  IonIcon,
} from '@ionic/angular/standalone';
import { trashBin } from 'ionicons/icons';
import { addIcons } from 'ionicons';

import { DatepickerComponent } from 'src/app/shared/components/datepicker/datepicker.component';
import { ValidatorFormControlComponent } from 'src/app/shared/components/validator-form-control/validator-form-control.component';
import { FORM_VALIDATION_ERROR_MESSAGES } from 'src/app/features/auth/constants/form-validation-error-messages.constant';
import { getDatepickerButtonLabelUtility } from 'src/app/shared/utils/get-datepicker-button-label.utility';
import { formattingDateToLocalStringUtility } from 'src/app/shared/utils/formatting-date-to-local-string.utility';
import { ErrorNotificationComponent } from 'src/app/shared/components/error-notification/error-notification.component';
import {
  ActionButtonComponent,
  LabelButtonType,
} from 'src/app/shared/components/action-button/action-button.component';

@Component({
  selector: 'health-personal-info-form',
  templateUrl: './personal-info-form.component.html',
  styleUrls: ['./personal-info-form.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonIcon,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonRadioGroup,
    IonRadio,
    IonItemGroup,
    IonNote,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonThumbnail,
    IonImg,
    DatepickerComponent,
    ValidatorFormControlComponent,
    ActionButtonComponent,
    ErrorNotificationComponent,
  ],
})
export class PersonalInfoFormComponent implements OnInit {
  formReady = output<FormGroup>();
  personalInfoFormGroup!: FormGroup;
  isDatepickerOpen = signal<boolean>(false);
  isImageType = signal<boolean>(true);
  photoPreviewUrl = signal<string | ArrayBuffer | null>(null);
  FORM_VALIDATION_ERROR_MESSAGES = FORM_VALIDATION_ERROR_MESSAGES;
  regions: string[] = [
    'Брестская область',
    'Витебская область',
    'Гомельская область',
    'Гродненская область',
    'Минская область',
    'Могилевская область',
  ];

  constructor() {
    addIcons({ trashBin });
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.personalInfoFormGroup = new FormGroup({
      lastName: new FormControl(null, [Validators.required]),
      firstName: new FormControl(null, [Validators.required]),
      middleName: new FormControl(null),
      dateOfBirth: new FormControl(null, [Validators.required]),
      gender: new FormControl(null, [Validators.required]),
      photo: new FormControl(null, [Validators.required]),
    });

    this.formReady.emit(this.personalInfoFormGroup);
  }

  onClickFileInput(fileInput: HTMLInputElement): void {
    fileInput.click();
    this.setErrorRequiredTrueForPhotoControl();
  }

  setErrorRequiredTrueForPhotoControl(): void {
    const photoControl = this.personalInfoFormGroup.get('photo');

    if (!photoControl?.value) {
      photoControl?.setErrors({ required: true });
      photoControl?.markAsTouched();
      photoControl?.updateValueAndValidity();
    }
  }

  clearErrorRequiredTrueForPhotoControl(
    photoControl: AbstractControl | null
  ): void {
    if (photoControl) {
      photoControl.setErrors(null);
      photoControl.markAsTouched();
      photoControl.updateValueAndValidity();
    }
  }

  onPhotoUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    const photoControl = this.personalInfoFormGroup.get('photo');

    if (input.files && input.files[0]) {
      const file = input.files[0];

      if (!file.type.startsWith('image/')) {
        this.isImageType.set(false);
        return;
      } else {
        this.isImageType.set(true);
      }

      const reader = new FileReader();
      reader.onload = () => {
        this.photoPreviewUrl.set(reader.result);
      };
      reader.readAsDataURL(file);

      this.personalInfoFormGroup.patchValue({
        photo: file,
      });

      this.clearErrorRequiredTrueForPhotoControl(photoControl);
    } else {
      this.setErrorRequiredTrueForPhotoControl();
    }
  }

  removePhoto(): void {
    this.photoPreviewUrl.set(null);
    this.personalInfoFormGroup.get('photo')?.reset();
  }

  toggleDatepicker(): void {
    this.isDatepickerOpen.update((prevValue) => !prevValue);
  }

  get datepickerButtonLabel(): LabelButtonType {
    return getDatepickerButtonLabelUtility(this.isDatepickerOpen());
  }

  onDateChange(date: string): void {
    const formattedBirthDate = formattingDateToLocalStringUtility(date);

    this.personalInfoFormGroup.patchValue({
      dateOfBirth: formattedBirthDate,
    });
  }
}
