import { AbstractControl } from '@angular/forms';
import { FORM_VALIDATION_ERROR_MESSAGES } from 'src/app/shared/constants/form-validation-error-messages.constant';

type ValidatorType = keyof typeof FORM_VALIDATION_ERROR_MESSAGES;

type ValidatorErrorMessageType =
  (typeof FORM_VALIDATION_ERROR_MESSAGES)[ValidatorType];

export interface ValidatorFormControlInterface {
  control: AbstractControl;
  validator: ValidatorType;
  errorMessage: ValidatorErrorMessageType;
}
