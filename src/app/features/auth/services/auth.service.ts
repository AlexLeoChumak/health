import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, switchMap } from 'rxjs';

import { environment } from 'src/environments/environment';
import { DoctorRequestInterface } from 'src/app/shared/models/doctor.interface';
import { PatientRequestInterface } from 'src/app/shared/models/patient.interface';
import { GlobalApiResponseInterface } from 'src/app/shared/models/global-api-response.interface';
import { RegistrationApiResponseInterface } from 'src/app/features/auth/models/registration-api-response.interface';
import { UpdateResultInterface } from 'src/app/shared/models/update-result.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http: HttpClient = inject(HttpClient);

  private isDoctor(
    userData: PatientRequestInterface | DoctorRequestInterface
  ): boolean {
    return 'placeWorkInfo' in userData.user;
  }

  registration(
    userData: PatientRequestInterface | DoctorRequestInterface
  ): Observable<GlobalApiResponseInterface<RegistrationApiResponseInterface>> {
    const registrationBaseUrl: string = 'auth/registration';

    const url = `${environment.apiBaseUrl}/${registrationBaseUrl}/${
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

    return this.http
      .post<GlobalApiResponseInterface<RegistrationApiResponseInterface>>(
        url,
        requestData
      )
      .pipe(
        switchMap((response) => {
          return this.uploadUserPhoto(response, photo, userData);
        })
      );
  }

  uploadUserPhoto(
    response: GlobalApiResponseInterface<RegistrationApiResponseInterface>,
    photo: string | File | null,
    userData: PatientRequestInterface | DoctorRequestInterface
  ): Observable<GlobalApiResponseInterface<RegistrationApiResponseInterface>> {
    const userProfileBaseUrl: string = 'user-profile';
    const uploadPhotoBaseUrl: string = 'upload-photo';

    const userId = response?.data?.userId;

    if (userId && photo && photo instanceof File) {
      const uploadPhotoFullUrl = `${
        environment.apiBaseUrl
      }/${userProfileBaseUrl}/${
        this.isDoctor(userData) ? 'doctor' : 'patient'
      }/${userId}/${uploadPhotoBaseUrl}`;

      const formData = new FormData();
      formData.append('photo', photo);

      return this.http
        .patch<GlobalApiResponseInterface<UpdateResultInterface>>(
          uploadPhotoFullUrl,
          formData
        )
        .pipe(map(() => response));
    }

    return of(response);
  }
}
