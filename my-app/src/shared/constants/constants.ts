import { getDefaultPaginationOffset } from '@shared/configs/configs/config';
import {
  COMMON_LAB_TEST_RESULTS_PATH,
  DISCHARGE_SUMMARY_PATH,
  FINANCIAL_CONSENTS_PATH,
  HEALTH_RISK_ASSESSMENT_PATH,
  IMMUNISATION_RECORDS_PATH,
  NEHR_ACCESS_HISTORY_PATH,
  RECORDS_SCREENING_LETTER_PATH,
  PRESCRIPTION_PATH,
  HEALTH_SCREENING_PATH,
  RADIOLOGY_PATH,
} from '@shared/constants/paths';
import { ResizeFilePayload } from '@shared/utils/image';

export const DATE_FORMAT = 'DD MMM YYYY';
export const DATETIME_FORMAT = 'DD MMM YYYY, hh:mm A';
export const DATE_DAY_TIME_FORMAT = 'DD MMM YYYY (ddd), hh:mm A';

export const LAYOUT_PORTAL_PUBLIC = 'PORTAL_PUBLIC';
export const LAYOUT_MOBILE_PUBLIC = 'MOBILE_PUBLIC';
export const LAYOUT_PORTAL = 'PORTAL';
export const LAYOUT_PORTAL_PUBLIC_UNSTYLE_CONTENT = 'LAYOUT_PORTAL_PUBLIC_UNSTYLE_CONTENT';
export const LAYOUT_PORTAL_UNSTYLE_CONTENT = 'LAYOUT_PORTAL_UNSTYLE_CONTENT';
export const LAYOUT_STANDARD = 'STANDARD';
export const LAYOUT_COMMON = 'COMMON';
export const LAYOUT_MOBILE = 'MOBILE';
export const LAYOUT_PUBLIC = 'PUBLIC';

export const PATH_MOBILE_URL = '/mobile';
export const PATH_STANDARD_URL = '/standard';

export const SUCCESS_MESSAGE = 'Success';

export const CONNECTION_ERROR_BASE64_SESSION_KEY = 'connectionErrorBase64';

export const PERSONALHEALTH_ROOT_PATH = 'PersonalHealth';

export const FILL_MY_INFO_QUERY = 'fillMyInfo';
export const SOURCE_MYINFO = 'MyInfo';
export const HEALTHIERSG_FAQ_URL = 'https://ask.gov.sg/healthiersg';

export enum SwitchProfileType {
  FAMILY = 'FAMILY',
  CHILDREN = 'CHILDREN',
  SELF = 'SELF',
  ALL = 'ALL',
}

export enum ResourceType {
  LAB_RESULTS = 'LAB_RESULTS',
  APPOINTMENTS = 'APPOINTMENTS',
  DISCHARGE_SUMMARY = 'DISCHARGE_SUMMARY',
  MEDICATIONS = 'MEDICATIONS',
  DIAGNOSES_PROBLEMS = 'DIAGNOSES_PROBLEMS',
  VITALS = 'VITALS',
  IMMUNISATIONS = 'IMMUNISATIONS',
  HEALTH_SCREENING = 'HEALTH_SCREENING',
  MEDICAL_REPORTS_CERTIFICATE = 'MEDICAL_REPORTS_CERTIFICATE',
  PRESCRIPTION_RECORDS = 'PRESCRIPTION_RECORDS',
  CHAS_DETAILS = 'CHAS_DETAILS',
  DIABETES_RISK_ASSESSMENT = 'DIABETES_RISK_ASSESSMENT',
  SCREENING = 'SCREENING',
  SCREENING_SUMMARY = 'SCREENING_SUMMARY',
  ACCESS_LOG = 'ACCESS_LOG',
  OPT_OUT = 'OPT_OUT',
  COMPOSITION_INDICATOR = 'COMPOSITION_INDICATOR',
  COMPOSITION = 'COMPOSITION',
  ENROLMENT = 'ENROLMENT',
  PAYMENTS = 'PAYMENTS',
  ALL = 'ALL',
  CAREPLAN = 'CAREPLAN',
  APPOINTMENTS_VIEW = 'APPOINTMENTS_VIEW',
  APPOINTMENTS_TRXN = 'APPOINTMENTS_TRXN',
  DISABILITY_DETAIL = 'DISABILITY_DETAIL',
  DISABILITY_LIST = 'DISABILITY_LIST',
  MEDICATIONREFILL = 'MEDICATIONREFILL',
  RADIOLOGY_NUCLEAR_MEDICINE_REPORTS = 'RADIOLOGY_NUCLEAR_MEDICINE_REPORTS',
  HEALTHIER_SG = 'HEALTHIER_SG',
  MEDICAL_ALERT_AND_ADR_DRUG_ALLERGY = 'MEDICAL_ALERT_AND_ADR_DRUG_ALLERGY',
}

export enum SectionCode {
  VITALS = 'vitals',
  DISCHARGE = 'discharge',
  PRESCRIPTION = 'prescription',
}
// Date formats
export const DATE_DISPLAY = 'DD MMM YYYY';
export const DATETIME_DISPLAY1 = 'DD MMM YYYY, hh:mma';
export const DATETIME_DISPLAY2 = 'DD MMM YYYY | hh:mma';

// module titles
export const SCF_TITLE = 'Smoking Cessation & Nicotine <br/>Dependence (Fagerstrom) Questionnaire';

export const ACCESS_NOT_GRANTED_CODE = 'LB0005';

export const SPECIAL_NRIC_CODE = 'I0012';

export const NEHR_OPT_OUT_CODE = 'OPT_OUT';

export const SYSTEM_ERROR_MESSAGE_PREFIX = 'Request failed with status code';

export const FIN_STARTSWITH = ['G', 'F', 'M'];

export const GOOGLE_API_MAP_URL =
  'https://www.onemap.gov.sg/api/common/elastic/search?returnGeom=Y&getAddrDetails=Y&pageNum=1&searchVal=';

export const CONSENT_HPB_URL = 'https://consent.hpb.gov.sg/';

export const CARE_RECIPIENT_ACCESS_URL =
  'https://support.healthhub.sg/hc/en-us/sections/15755746612121-Caregiver-and-Care-Recipient-Access';

export enum RelatedPeopleStatus {
  PENDING = 'Request Pending',
  APPROVED = 'Approved',
  ACCEPTED = 'Accepted',
}

export const RELATIONSHIP_OPTIONS = [
  {
    value: 'Parent',
    label: 'Parent',
  },
  {
    value: 'Spouse',
    label: 'Spouse',
  },
  {
    value: 'Sibling',
    label: 'Sibling',
  },
  {
    value: 'Child',
    label: 'Child',
  },
  {
    value: 'Friend',
    label: 'Friend',
  },
  {
    value: 'Other Relative',
    label: 'Other Relative',
  },
  {
    value: 'Others',
    label: 'Others',
  },
];

export const RESIZE_AVATAR_DEFAULT_PAYLOAD: ResizeFilePayload = {
  maxHeight: 200,
  maxWidth: 200,
  compressFormat: 'png',
  quality: 70,
  outputType: 'file',
};

export enum SourceCodeType {
  PERSONAL = 'PH',
  FAMILY_FRIEND = 'FH',
  CHILDREN = 'CH',
}

export enum Cluster {
  NHG = 'NHG',
  NUHS = 'NUHS',
  SHS = 'SHS',
  HPB = 'HPB',
}

export enum Gender {
  MALE = 'M',
  FEMALE = 'F',
}

export enum GenderValue {
  Female = 'Female',
  Male = 'Male',
}

export const NUMBER_OF_PAGINATION_ITEMS = getDefaultPaginationOffset();

export const MOBILE_FIRST_AND_SECOND_LEVEL_PAGES = [
  RECORDS_SCREENING_LETTER_PATH,
  COMMON_LAB_TEST_RESULTS_PATH,
  HEALTH_RISK_ASSESSMENT_PATH,
  FINANCIAL_CONSENTS_PATH,
  IMMUNISATION_RECORDS_PATH,
  DISCHARGE_SUMMARY_PATH,
  PRESCRIPTION_PATH,
  NEHR_ACCESS_HISTORY_PATH,
  HEALTH_SCREENING_PATH,
  RADIOLOGY_PATH,
];

export const FROM_HEALTH_RECORDS_SESSION_KEY = 'fromHealthRecords';
export const TERM_OF_USES_TITLE_CODE = 'Terms.Of.Use.Title';
export const TERM_OF_USES_CODE = 'Terms.Of.Use';
export const IS_MOBILE_CALLBACK_URL = 'isMobileCallbackUrl';
