export interface PatientBaseInterface {
  user: {
    addressRegistrationInfo: {
      apartment: string | null;
      city: string;
      district: string;
      house: string;
      housing: string | null;
      region: string;
      street: string;
    };
    addressResidenceInfo: {
      apartment: string | null;
      city: string;
      district: string;
      house: string;
      housing: string | null;
      region: string;
      street: string;
    };
    contactInfo: {
      email: string;
      homePhoneNumber: string | null;
      mobilePhoneNumber: string;
    };
    identificationInfo: {
      documentName: string | null;
      documentNumber: string | null;
      healthInsuranceContractNumber: string | null;
      nameInsuranceCompany: string | null;
      nameStateForeignCitizen: string | null;
      passportIssueDate: string | null;
      passportIssuingAuthority: string | null;
      passportSeriesNumber: string | null;
      personalIdentificationNumber: string | null;
      userCitizenship: string;
    };
    personalInfo: {
      dateOfBirth: string;
      firstName: string;
      gender: string;
      lastName: string;
      middleName: string | null;
      photo: File | string;
    };
  };
}

export interface PatientRequestInterface extends PatientBaseInterface {
  user: PatientBaseInterface['user'] & {
    contactInfo: PatientBaseInterface['user']['contactInfo'] & {
      password: string;
    };
  };
}

// export interface PatientResponseInterface extends PatientBaseInterface {
//   id: string;
//   contactInfo: PatientBaseInterface['user']['contactInfo'] & {
//     hashedPassword: string;
//   };
// }
