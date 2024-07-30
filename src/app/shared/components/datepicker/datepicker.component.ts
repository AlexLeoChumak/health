import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonDatetimeButton,
  IonDatetime,
} from '@ionic/angular/standalone';

@Component({
  selector: 'health-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  standalone: true,
  imports: [IonDatetime, FormsModule, IonContent, IonDatetimeButton],
})
export class DatepickerComponent {
  @Output() dateChange = new EventEmitter<string>();

  onDateChange(event: CustomEvent): void {
    const selectedDate: string = event.detail.value;
    this.dateChange.emit(selectedDate);
  }
}
