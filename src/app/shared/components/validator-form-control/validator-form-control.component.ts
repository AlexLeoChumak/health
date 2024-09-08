import { Component, input } from '@angular/core';

import { ErrorNotificationComponent } from 'src/app/shared/components/error-notification/error-notification.component';
import { ValidatorFormControlInterface } from 'src/app/shared/models/validator-form-control.interface';

@Component({
  selector: 'health-validator-form-control',
  templateUrl: './validator-form-control.component.html',
  styleUrls: ['./validator-form-control.component.scss'],
  standalone: true,
  imports: [ErrorNotificationComponent],
})
export class ValidatorFormControlComponent {
  validatorFormControlProps = input<ValidatorFormControlInterface>();
}
