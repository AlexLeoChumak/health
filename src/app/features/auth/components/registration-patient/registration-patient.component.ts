import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonCheckbox,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/angular/standalone';

import { RegistrationBaseComponent } from 'src/app/features/auth/components/registration-base/registration-base.component';
import { ContactInfoFormComponent } from 'src/app/shared/components/contact-info-form/contact-info-form.component';
import { AddressInfoFormComponent } from 'src/app/shared/components/address-info-form/address-info-form.component';
import { PersonalInfoFormComponent } from 'src/app/shared/components/personal-info-form/personal-info-form.component';
import { IdentificationInfoFormComponent } from 'src/app/shared/components/identification-info-form/identification-info-form.component';
import { ActionButtonComponent } from 'src/app/shared/components/action-button/action-button.component';

@Component({
  selector: 'health-registration-patient',
  templateUrl: './registration-patient.component.html',
  styleUrls: ['./registration-patient.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonCol,
    IonRow,
    IonGrid,
    IonCheckbox,
    IonLabel,
    IonItem,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    ContactInfoFormComponent,
    AddressInfoFormComponent,
    PersonalInfoFormComponent,
    IdentificationInfoFormComponent,
    ActionButtonComponent,
  ],
})
export class RegistrationPatientComponent
  extends RegistrationBaseComponent
  implements OnInit
{
  constructor() {
    super();
  }

  ngOnInit(): void {
    this.initializeForm();
  }
}
