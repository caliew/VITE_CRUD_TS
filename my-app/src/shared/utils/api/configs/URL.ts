import { apiBaseUrl } from '@shared/configs';
import { appName, appVersion, appLogo, webAccessToken, mapboxGLAccessToken,
         sharepointApiBaseUrl, appApiKey } from "@shared/configs/configs/config";

export const APP_NAME = appName();
export const APP_VERSION = appVersion();
export const APP_LOGO = appLogo();

export const WEB_ACCESSTOKEN = webAccessToken();
export const MAPGL_ACCESSTOKEN = mapboxGLAccessToken();

// Base URL for APIs
export const API_BASE_URL = apiBaseUrl();
// Base URL for Sharepoint APIs
export const SHAREPOINT_API_BASE_URL = sharepointApiBaseUrl();
export const API_KEY = appApiKey();


export const GET_HSG_SFLLETTER_URL = `${API_BASE_URL}/v1/healthassessment/sfl`;

