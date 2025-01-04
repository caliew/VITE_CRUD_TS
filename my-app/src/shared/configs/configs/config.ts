import { getBlueGreenValue } from './utils';
import { getEnvValue, isTrue } from '../helpers/configHelper';

export const REACT_APP_NAME = 'VITE_REACT_APP_NAME';
export const REACT_APP_VERSION = 'VITE_REACT_APP_VERSION';
export const REACT_APP_LOGO = 'VITE_REACT_APP_LOGO';

export const REACT_WEB_ACCESSTOKEN = 'VITE_REACT_WEB_ACCESSTOKEN';
export const REACT_MAPBOXGL_ACCESSTOKEN = 'VITE_REACT_MAPBOXGL_ACCESSTOKEN';

export const REACT_BLUE_APP_API_BASE_URL = 'VITE_REACT_BLUE_APP_API_BASE_URL';
export const REACT_GREEN_APP_API_BASE_URL = 'VITE_REACT_GREEN_APP_API_BASE_URL';

export const REACT_BLUE_APP_ENV_BASE_URL = 'VITE_REACT_BLUE_APP_ENV_BASE_URL';
export const REACT_GREEN_APP_ENV_BASE_URL = 'VITE_REACT_GREEN_APP_ENV_BASE_URL';

export const REACT_BLUE_APP_API_KEY = 'VITE_REACT_BLUE_APP_API_KEY';
export const REACT_GREEN_APP_API_KEY = 'VITE_REACT_GREEN_APP_API_KEY';

export const REACT_APP_ENABLE_LOG = 'VITE_REACT_APP_ENABLE_LOG';
export const REACT_APP_SHAREPOINT_API_BASE_URL = 'VITE_REACT_APP_SHAREPOINT_API_BASE_URL';
export const REACT_APP_ENV_KEY = 'VITE_REACT_APP_ENV_KEY';
export const REACT_APP_SHAREPOINT_HOMEBASE_URL = 'VITE_REACT_APP_SHAREPOINT_HOMEBASE_URL';
export const REACT_APP_GOOGLE_MAPS_API_KEY = 'VITE_REACT_APP_GOOGLE_MAPS_API_KEY';
export const REACT_APP_GOOGLE_RECAPTCHA_SITEKEY = 'VITE_REACT_APP_GOOGLE_RECAPTCHA_SITEKEY';
export const REACT_APP_GOOGLE_RECAPTCHA_SECRET = 'VITE_REACT_APP_GOOGLE_RECAPTCHA_SECRET';
export const REACT_APP_PUBLIC_FAQ_LINK = 'VITE_REACT_APP_PUBLIC_FAQ_LINK';
export const REACT_APP_HAS_NUP_MAMMOGRAM_LINK = 'VITE_REACT_APP_HAS_NUP_MAMMOGRAM_LINK';
export const REACT_APP_HAS_NHGP_MAMMOGRAM_LINK = 'VITE_REACT_APP_HAS_NHGP_MAMMOGRAM_LINK';
export const REACT_APP_ENABLE_HEALTHIERSG_HOMEPAGE = 'VITE_REACT_APP_ENABLE_HEALTHIERSG_HOMEPAGE';
export const REACT_APP_GOOGLE_ANALYTICS_ID = 'VITE_REACT_APP_GOOGLE_ANALYTICS_ID';
export const REACT_APP_GTM_CONTAINER_ID = 'VITE_REACT_APP_GTM_CONTAINER_ID';
export const REACT_APP_VALIDATE_DAYS_LIMIT = 'VITE_REACT_APP_VALIDATE_DAYS_LIMIT';
export const REACT_APP_LAB_RESULTS_DAYS_LIMIT = 'VITE_REACT_APP_LAB_RESULTS_VALIDATE_DAYS_LIMIT';
export const REACT_APP_PRESCRIPTION_VALIDATE_DAYS_LIMIT = 'VITE_REACT_APP_PRESCRIPTION_VALIDATE_DAYS_LIMIT';
export const REACT_APP_DISCHARGE_VALIDATE_DAYS_LIMIT = 'VITE_REACT_APP_DISCHARGE_VALIDATE_DAYS_LIMIT';
export const REACT_APP_MRRP_VALIDATE_DAYS_LIMIT = 'VITE_REACT_APP_MRRP_VALIDATE_DAYS_LIMIT';
export const REACT_APP_NEHR_ACCESS_HISTORY_VALIDATE_DAYS_LIMIT = 'VITE_REACT_APP_NEHR_ACCESS_HISTORY_VALIDATE_DAYS_LIMIT';
export const REACT_APP_RADIOLOGY_VALIDATE_DAYS_LIMIT = 'VITE_REACT_APP_RADIOLOGY_VALIDATE_DAYS_LIMIT';
export const REACT_APP_HEALTH_SCREENING_VALIDATE_DAYS_LIMIT = 'VITE_REACT_APP_HEALTH_SCREENING_VALIDATE_DAYS_LIMIT';
export const REACT_APP_DEFAULT_PAGINATION_OFFSET = 'VITE_REACT_APP_DEFAULT_PAGINATION_OFFSET';
export const REACT_APP_RADIOLOGY_PAGINATION_OFFSET = 'VITE_REACT_APP_RADIOLOGY_PAGINATION_OFFSET';
export const REACT_APP_RADIOLOGY_DELAY_START_DATE = 'VITE_REACT_APP_RADIOLOGY_DELAY_START_DATE';
export const REACT_APP_RADIOLOGY_DELAY_END_DATE = 'VITE_REACT_APP_RADIOLOGY_DELAY_END_DATE';
export const REACT_APP_RADIOLOGY_DELAY_DAYS = 'VITE_REACT_APP_RADIOLOGY_DELAY_DAYS';
export const REACT_APP_REACT_PUBLIC_URL = 'VITE_REACT_PUBLIC_URL';
export const REACT_APP_SDC_APPOINTMENT = 'VITE_REACT_SDC_APPOINTMENT';
export const REACT_APP_SHC_APPOINTMENT = 'VITE_REACT_SHC_APPOINTMENT';
export const REACT_S3_PHOTO_FOLDER_PREFIX = 'VITE_REACT_S3_PHOTO_FOLDER_PREFIX';
export const REACT_AUTH_APP_CLIENT_ID = 'VITE_REACT_AUTH_APP_CLIENT_ID';
export const REACT_AUTH_REDIRECT_URI = 'VITE_REACT_AUTH_REDIRECT_URI';
export const REACT_AUTH_SCOPE = 'VITE_REACT_AUTH_SCOPE';
export const REACT_AUTH_AUTHORITY = 'VITE_REACT_AUTH_AUTHORITY';
export const REACT_AUTH_CLIENT_SECRET = 'VITE_REACT_AUTH_CLIENT_SECRET';
export const REACT_PSS_QUESTION_URL = 'VITE_REACT_PSS_QUESTION_URL';
export const REACT_DEV = 'DEV';
export const REACT_APP_IQUIT_SMOKING_LINK = 'VITE_REACT_APP_IQUIT_SMOKING_LINK';

// Obtains the API's base URL from environment variables
// @throws  Throws an error if this variable could not be found

const appName = ():string => getEnvValue(REACT_APP_NAME);
const appVersion = ():string => getEnvValue(REACT_APP_VERSION);
const appLogo = ():string => getEnvValue(REACT_APP_LOGO);

const webAccessToken = ():string => getEnvValue(REACT_WEB_ACCESSTOKEN);
const mapboxGLAccessToken = ():string => getEnvValue(REACT_MAPBOXGL_ACCESSTOKEN);

const apiBaseUrl = (): string => getBlueGreenValue(getEnvValue(REACT_BLUE_APP_API_BASE_URL), getEnvValue(REACT_GREEN_APP_API_BASE_URL));
const envBaseUrl = (): string => getBlueGreenValue(getEnvValue(REACT_BLUE_APP_ENV_BASE_URL), getEnvValue(REACT_GREEN_APP_ENV_BASE_URL));

// Obtains the log configuration from environment variables
// @throws  Throws an error if this variable could not be found
const enableLogs = (): boolean => isTrue(REACT_APP_ENABLE_LOG);

// Obtains the Sharepoint API's base URL from environment variables
// @throws  Throws an error if this variable could not be found
const sharepointApiBaseUrl = (): string => getEnvValue(REACT_APP_SHAREPOINT_API_BASE_URL);

// Current API Key.
// @throws  Throws an error if this variable could not be found
const appApiKey = (): string => getBlueGreenValue(getEnvValue(REACT_BLUE_APP_API_KEY), getEnvValue(REACT_GREEN_APP_API_KEY));

// Current API ENV Key.
// @throws  Throws an error if this variable could not be found
const appEnvKey = (): string => getEnvValue(REACT_APP_ENV_KEY);

// Sharepoint Home Page
// @throws  Throws an error if this variable could not be found
const sharepointHomeBaseUrl = (): string => getEnvValue(REACT_APP_SHAREPOINT_HOMEBASE_URL);
const getPublicFAQUrl = (): string => getEnvValue(REACT_APP_PUBLIC_FAQ_LINK);
const getHasNupMammogramUrl = (): string => getEnvValue(REACT_APP_HAS_NUP_MAMMOGRAM_LINK);
const getHasNhgpMammogramUrl = (): string => getEnvValue(REACT_APP_HAS_NHGP_MAMMOGRAM_LINK);
const getValidateDaysLimit = (): number => Number(getEnvValue(REACT_APP_VALIDATE_DAYS_LIMIT));
const getLabResultsDaysLimit = (): number => Number(getEnvValue(REACT_APP_LAB_RESULTS_DAYS_LIMIT));
const getRadioLogyDaysLimit = (): number => Number(getEnvValue(REACT_APP_RADIOLOGY_VALIDATE_DAYS_LIMIT));
const getHealthScreeningDaysLimit = (): number => Number(getEnvValue(REACT_APP_HEALTH_SCREENING_VALIDATE_DAYS_LIMIT));
const getRadiologyPaginationOffset = (): number => Number(getEnvValue(REACT_APP_RADIOLOGY_PAGINATION_OFFSET));
const getRadiologyDelayStartDate = (): string => getEnvValue(REACT_APP_RADIOLOGY_DELAY_START_DATE);
const getRadiologyDelayEndDate = (): string => getEnvValue(REACT_APP_RADIOLOGY_DELAY_END_DATE);
const getRadiologyDelayDays = (): number => Number(getEnvValue(REACT_APP_RADIOLOGY_DELAY_DAYS));
const getPrescriptionValidateDaysLimit = (): number => Number(getEnvValue(REACT_APP_PRESCRIPTION_VALIDATE_DAYS_LIMIT));
const getDischargeValidateDaysLimit = (): number => Number(getEnvValue(REACT_APP_DISCHARGE_VALIDATE_DAYS_LIMIT));
const getMRPPValidateDaysLimit = (): number => Number(getEnvValue(REACT_APP_MRRP_VALIDATE_DAYS_LIMIT));
const getValidateNehrAccessHistoryDaysLimit = (): number => Number(getEnvValue(REACT_APP_NEHR_ACCESS_HISTORY_VALIDATE_DAYS_LIMIT));
const getDefaultPaginationOffset = (): number => Number(getEnvValue(REACT_APP_DEFAULT_PAGINATION_OFFSET));

// Google api key
// @throws  Throws an error if this variable could not be found
const googleApiKey = (): string => getEnvValue(REACT_APP_GOOGLE_MAPS_API_KEY);

// Google reCaptcha
// @throws  Throws an error if this variable could not be found
const googleCaptchaSitekey = (): string => getEnvValue(REACT_APP_GOOGLE_RECAPTCHA_SITEKEY);
const googleCaptchaSecretkey = (): string => getEnvValue(REACT_APP_GOOGLE_RECAPTCHA_SECRET);

// Google Analytics
// @throws  Throws an error if this variable could not be found
const googleAnalyticsId = () => getEnvValue(REACT_APP_GOOGLE_ANALYTICS_ID);
const googleTagManagerContainerId = () => getEnvValue(REACT_APP_GTM_CONTAINER_ID);
const getPublicUrl = () => getEnvValue(REACT_APP_REACT_PUBLIC_URL);
const getSDCFormAppointment = () => getEnvValue(REACT_APP_SDC_APPOINTMENT);
const getSHCFormAppointment = () => getEnvValue(REACT_APP_SHC_APPOINTMENT);
const getS3PhotoFolderPrefix = () => getEnvValue(REACT_S3_PHOTO_FOLDER_PREFIX);
const authClientId = () => getEnvValue(REACT_AUTH_APP_CLIENT_ID);
const authRedirectURI = () => getEnvValue(REACT_AUTH_REDIRECT_URI);
const authScope = () => getEnvValue(REACT_AUTH_SCOPE);
const authAuthority = () => getEnvValue(REACT_AUTH_AUTHORITY);
const authClientSecret = () => getEnvValue(REACT_AUTH_CLIENT_SECRET);
const getPSSQuestionUrl = () => getEnvValue(REACT_PSS_QUESTION_URL);
const getIQuitSmokingUrl = (): string => getEnvValue(REACT_APP_IQUIT_SMOKING_LINK);

export {
        appName, appVersion, appLogo,
         webAccessToken, mapboxGLAccessToken,
        apiBaseUrl, enableLogs,
        sharepointApiBaseUrl, envBaseUrl,
        getPublicUrl, getPublicFAQUrl, getHasNupMammogramUrl, getHasNhgpMammogramUrl, sharepointHomeBaseUrl,
        getValidateDaysLimit, getLabResultsDaysLimit, getPrescriptionValidateDaysLimit,
        getDischargeValidateDaysLimit, getMRPPValidateDaysLimit, getValidateNehrAccessHistoryDaysLimit,
        getHealthScreeningDaysLimit, getRadioLogyDaysLimit,
        getRadiologyPaginationOffset,
        getRadiologyDelayStartDate, getRadiologyDelayEndDate, getRadiologyDelayDays,
        appApiKey, appEnvKey,
        googleApiKey, googleCaptchaSitekey, googleCaptchaSecretkey, googleAnalyticsId,
        googleTagManagerContainerId, getDefaultPaginationOffset,
        getSDCFormAppointment, getSHCFormAppointment,
        getS3PhotoFolderPrefix,
        authClientId, authRedirectURI, authScope, authAuthority, authClientSecret,
        getPSSQuestionUrl, getIQuitSmokingUrl
};
         