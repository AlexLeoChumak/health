import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  output,
  signal,
} from '@angular/core';
import {
  FormControl,
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
import {
  ActionButtonComponent,
  LabelButtonType,
} from '../../action-button/action-button.component';
import { getDatepickerButtonLabelUtility } from 'src/app/shared/utils/getDatepickerButtonLabel.utility';
import { formattingDateToLocalStringUtility } from 'src/app/shared/utils/formattingDateToLocalString.utility';

@Component({
  selector: 'health-identification-info-form-for-citizens-belarus',
  templateUrl: './identification-info-form-for-citizens-belarus.component.html',
  styleUrls: ['./identification-info-form-for-citizens-belarus.component.scss'],
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
    ActionButtonComponent,
  ],
})
export class IdentificationInfoFormForCitizensBelarusComponent
  implements OnInit
{
  formControls = output<Record<string, FormControl>>();
  controls!: Record<string, FormControl>;
  isDatepickerOpen = signal<boolean>(false);
  FORM_VALIDATION_ERROR_MESSAGES = FORM_VALIDATION_ERROR_MESSAGES;

  constructor() {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.controls = {
      personalIdentificationNumber: new FormControl(null, [
        Validators.required,
      ]),
      passportSeriesNumber: new FormControl(null, [Validators.required]),
      passportIssueDate: new FormControl(null, [Validators.required]),
      passportIssuingAuthority: new FormControl(null, [Validators.required]),
    };

    this.formControls.emit(this.controls);
  }

  toggleDatepicker(): void {
    this.isDatepickerOpen.update((prevValue) => !prevValue);
  }

  get datepickerButtonLabel(): LabelButtonType {
    return getDatepickerButtonLabelUtility(this.isDatepickerOpen());
  }

  onDateChange(date: string): void {
    const formattedPassportIssueDate = formattingDateToLocalStringUtility(date);

    this.controls['passportIssueDate'].setValue(formattedPassportIssueDate);
  }
}
