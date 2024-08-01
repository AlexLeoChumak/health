import { Component, OnInit } from '@angular/core';
import { catchError, of } from 'rxjs';

import {
  IonList,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { YandexMapsService } from 'src/app/features/address-autocomplete/services/yandex-maps/yandex-maps.service';

@Component({
  selector: 'health-address-autocomplete',
  templateUrl: './address-autocomplete.component.html',
  styleUrls: ['./address-autocomplete.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonList,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
  ],
})
export class AddressAutocompleteComponent implements OnInit {
  address: string = '';
  predictions: any[] = [];

  constructor(private yandexMapsService: YandexMapsService) {}

  ngOnInit() {
    this.loadYandexMaps();
  }

  loadYandexMaps(): void {
    this.yandexMapsService
      .loadApi()
      .pipe(
        catchError((error) => {
          console.error('Yandex Maps API load error:', error);
          return of();
        })
      )
      .subscribe(() => {});
  }

  onInput(event: any) {
    const input = event.target.value;

    if (input.length > 0) {
      this.yandexMapsService.getSuggestions(input).subscribe((predictions) => {
        this.predictions = predictions;
      });
    } else {
      this.predictions = [];
    }
  }

  selectAddress(prediction: any) {
    this.address = prediction.text;
    this.predictions = [];
  }
}
