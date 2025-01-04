import { IUserProfile } from '../types';

export interface IUserFamilyProfileResponse {
  children: IProfileDetail[];
  careDependants: IProfileDetail[];
  userProfile: IUserProfile | null;
}
interface IProfileDetail {
  MemberId: number;
  MemberNric: string;
  DisplayName: string;
  Photo: string | null;
  MemberIdentifier: string | null;
  DateOfBirth?: string | null;
  DisplayAge?: string | null;
  Age?: number | null;
  Gender: string | null;
  Relationship: string | null;
  ProfileIdentifier: string | null;
}

export interface ICareDependantProfile {
  Profiles: IProfileDetail[];
}

export type GetUserProfileFamilyResponsePayload = {
  Status: 'S' | 'E';
  Code: string;
  Message: string;
  UserProfile: IUserProfile;
  Children: ICareDependantProfile;
  CareDependants: ICareDependantProfile;
};
