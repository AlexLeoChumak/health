import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, switchMap } from 'rxjs';

import { environment } from 'src/environments/environment';
import { DoctorRequestInterface } from 'src/app/shared/models/doctor.interface';
import { PatientRequestInterface } from 'src/app/shared/models/patient.interface';
import { RegistrationResponseInterface } from 'src/app/features/auth/models/registration-response.interface';

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
  ): Observable<RegistrationResponseInterface> {
    const url = `${environment.apiBaseUrl}/${this.registrationBaseUrl}/${
      this.isDoctor(userData) ? 'doctor' : 'patient'
    }`;

    const photo = userData?.user?.personalInfo?.photo;
    const requestData = {
      ...userData,
      user: {
        ...userData.user,
        personalInfo: { ...userData.user.personalInfo, photo: null },
      },
    };

    return this.http.post<RegistrationResponseInterface>(url, requestData).pipe(
      switchMap((res) => {
        const userId = res?.userId;

        if (userId && photo && photo instanceof File) {
          const uploadPhotoUrl = `${url}/${userId}/upload-photo`;
          const formData = new FormData();
          formData.append('photo', photo);

          return this.http.put<RegistrationResponseInterface>(
            uploadPhotoUrl,
            formData
          );
        }

        return of(res);
      })
    );
  }
}
