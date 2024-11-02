export interface RegistrationResponseInterface {
  message: string;
  statusCode: number;
  data: { userId: string };
}
// переделать под дженерик
// export interface UpdateResult {
//   generatedMaps: any[]; // или более строгий тип
//   raw: any[];
//   affected: number | null; // может быть null
// }
