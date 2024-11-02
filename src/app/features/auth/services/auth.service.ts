import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable, of, switchMap, tap } from 'rxjs';

import { environment } from 'src/environments/environment';
import { DoctorRequestInterface } from 'src/app/shared/models/doctor.interface';
import { PatientRequestInterface } from 'src/app/shared/models/patient.interface';
import { RegistrationResponseInterface } from 'src/app/features/auth/models/registration-response.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http: HttpClient = inject(HttpClient);
  private readonly registrationBaseUrl: string = 'auth/registration';
  private readonly userProfileBaseUrl: string = 'user-profile';

  private isDoctor(
    userData: PatientRequestInterface | DoctorRequestInterface
  ): boolean {
    return 'placeWorkInfo' in userData.user;
  }

  registration(
    userData: PatientRequestInterface | DoctorRequestInterface
  ): Observable<any> {
    //any
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
      switchMap((response) => {
        console.log(response);

        return this.uploadUserPhoto(response, photo, userData);
      })
    );
  }

  uploadUserPhoto(
    response: RegistrationResponseInterface,
    photo: string | File | null,
    userData: PatientRequestInterface | DoctorRequestInterface
  ) {
    const userId = response?.data?.userId;

    if (userId && photo && photo instanceof File) {
      const uploadPhotoUrl = `${environment.apiBaseUrl}/user-profile/${
        this.isDoctor(userData) ? 'doctor' : 'patient'
      }/${userId}/upload-photo`;
      const formData = new FormData();
      formData.append('photo', photo);

      return this.http
        .patch<any>(uploadPhotoUrl, formData)
        .pipe(tap((q) => console.log('qq', q))); //any
    }

    return of(response);
  }
}
