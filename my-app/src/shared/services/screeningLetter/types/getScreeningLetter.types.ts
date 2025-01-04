export type GetSflLetterResponsePayload = {
  Status: 'S' | 'E';

  Code: string;

  Message: string;

  Result: ISFLLetterText;
};

export type GetSflLetterRequestPayload = {
  MemberPrn?: string;
};

export interface ISFLLetterText {
  SFLLetterText: ISFLLetterTextDetail;
}

export interface ISFLLetterTextDetail {
  UserName: string;

  UserNric: string;

  HeaderText: string;

  ScreeningsText: ISFLScreeningsText | null;

  AdditionalScreeningsText: ISFLScreeningsText | null;

  ImportantNote: string | null;
}

export interface ISFLTest {
  Titile: string;

  Description: string | null;
}

export interface ISFLScreeningsText {
  BodyText: string;

  Tests: ISFLTest[];

  AmountText: string;

  Amount: string;

  AmountNotes: string;

  FooterTitle: string;

  FooterText: string[];

  FooterTextExt: string;
}
