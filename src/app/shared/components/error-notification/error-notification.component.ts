import { Component, Input, OnInit } from '@angular/core';
import { IonNote } from '@ionic/angular/standalone';

@Component({
  selector: 'health-error-notification',
  templateUrl: './error-notification.component.html',
  styleUrls: ['./error-notification.component.scss'],
  standalone: true,
  imports: [IonNote],
})
export class ErrorNotificationComponent {
  @Input() errorNotificationProps: string = 'Некорректные данные';
}
