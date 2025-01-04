export interface ISelectedProfile {
  memberIdentifier: string;
  sourceCode: string;
  name: string;
  nric: string;
  profileIdentifier?: string;
  photo: string;
  gender?: string;
  age?: number;
  displayAge?: string;
  relationship?: string;
  id?: string;
}

export interface UserState {
  sourceApp: string | null;
  selectedProfile: ISelectedProfile | null;
  loginDate?: number;
}
