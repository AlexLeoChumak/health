import { PatientBaseInterface } from 'src/app/shared/models/patient.interface';

interface DoctorBaseInterface extends PatientBaseInterface {
  user: PatientBaseInterface['user'] & {
    addressMedicalInstitutionInfo: {
      apartment: string | null;
      city: string;
      district: string;
      house: string;
      housing: string | null;
      region: string;
      street: string;
    };
    educationMedicalWorkerInfo: {
      faculty: string;
      licenseNumberMedicalActivities: string;
      nameEducationalInstitution: string;
      numberDiplomaHigherMedicalEducation: string;
      specialistCertificateNumber: string;
      speciality: string;
      specialization: string;
    };
    placeWorkInfo: {
      currentSpecialization: string;
      department: string;
      nameMedicalInstitution: string;
    };
  };
}

export interface DoctorRequestInterface extends DoctorBaseInterface {
  user: DoctorBaseInterface['user'] & {
    contactInfo: DoctorBaseInterface['user']['contactInfo'] & {
      password: string;
    };
  };
}

// export interface DoctorResponseInterface extends DoctorBaseInterface {
//   id: string;
//   contactInfo: DoctorBaseInterface['user']['contactInfo'] & {
//     hashedPassword: string;
//   };
// }
