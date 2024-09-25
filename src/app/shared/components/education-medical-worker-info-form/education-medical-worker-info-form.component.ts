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
  ReactiveFormsModule,
} from '@angular/forms';
import {
  IonItemGroup,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonInput,
  IonNote,
} from '@ionic/angular/standalone';

import { ValidatorFormControlComponent } from 'src/app/shared/components/validator-form-control/validator-form-control.component';
import { FORM_VALIDATION_ERROR_MESSAGES } from 'src/app/features/auth/constants/form-validation-error-messages.constant';

@Component({
  selector: 'health-education-medical-worker-info-form',
  templateUrl: './education-medical-worker-info-form.component.html',
  styleUrls: ['./education-medical-worker-info-form.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonNote,
    ReactiveFormsModule,
    IonItemGroup,
    IonItem,
    IonItemDivider,
    IonLabel,
    IonInput,
    ValidatorFormControlComponent,
  ],
})
export class EducationMedicalWorkerInfoFormComponent implements OnInit {
  formReady = output<FormGroup>();

  educationMedicalWorkerInfoFormGroup!: FormGroup;
  FORM_VALIDATION_ERROR_MESSAGES = FORM_VALIDATION_ERROR_MESSAGES;

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.educationMedicalWorkerInfoFormGroup = new FormGroup({
      nameEducationalInstitution: new FormControl(null, [Validators.required]),
      faculty: new FormControl(null, [Validators.required]),
      speciality: new FormControl(null, [Validators.required]),
      numberDiplomaHigherMedicalEducation: new FormControl(null, [
        Validators.required,
      ]),
      specialization: new FormControl(null, [Validators.required]),
      specialistCertificateNumber: new FormControl(null, [Validators.required]),
      licenseNumberMedicalActivities: new FormControl(null, [
        Validators.required,
      ]),
    });

    this.formReady.emit(this.educationMedicalWorkerInfoFormGroup);
  }
}
