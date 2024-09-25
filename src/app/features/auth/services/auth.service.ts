import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { DoctorRequestInterface } from 'src/app/shared/models/doctor.interface';
import { PatientRequestInterface } from 'src/app/shared/models/patient.interface';
import { AuthMessageResponseInterface } from 'src/app/features/auth/models/auth-message-response.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http: HttpClient = inject(HttpClient);
  private registrationBaseUrl: string = 'auth/registration';

  private isDoctor(
    userData: PatientRequestInterface | DoctorRequestInterface
  ): boolean {
    return 'placeWorkInfo' in userData.user;
  }

  registration(
    userData: PatientRequestInterface | DoctorRequestInterface
  ): Observable<AuthMessageResponseInterface> {
    const url = `${environment.apiBaseUrl}/${this.registrationBaseUrl}/${
      this.isDoctor(userData) ? 'doctor' : 'patient'
    }`;
    return this.http.post<AuthMessageResponseInterface>(url, userData);
  }
}
