import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { map, Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class YandexMapsService {
  private scriptLoaded: boolean = false;
  private readonly apiKey: string = 'e43410c0-85fb-43dc-aca1-6eb1668ccd90';

  constructor(private http: HttpClient, private ngZone: NgZone) {}

  loadApi(): Observable<void> {
    return new Observable((observer: Observer<void>) => {
      if (this.scriptLoaded) {
        observer.next();
        observer.complete();
        return;
      }

      const script = document.createElement('script');
      script.src = `https://api-maps.yandex.ru/2.1/?apikey=${this.apiKey}&lang=ru_RU`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        this.scriptLoaded = true;
        observer.next();
        observer.complete();
      };
      script.onerror = (error) => observer.error(error);
      document.body.appendChild(script);
    });
  }

  getSuggestions(input: string): Observable<any[]> {
    return this.http
      .get<any>(
        `https://geocode-maps.yandex.ru/1.x/?apikey=${this.apiKey}&format=json&geocode=${input}`
      )
      .pipe(
        map((response) => {
          const results = response.response.GeoObjectCollection.featureMember;

          return results.map((result: any) => ({
            text: result.GeoObject.metaDataProperty.GeocoderMetaData.text,
            value: result.GeoObject.Point.pos,
          }));
        })
      );
  }
}
