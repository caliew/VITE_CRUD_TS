export interface IUserProfile {
  UserId: string;
  Name: string;
  MaskedNric: string;
  IsDeceased: boolean;
  Photo: string;
  MobileNo: string;
  Email: string;
  LastLoginDate: string | null;
}
