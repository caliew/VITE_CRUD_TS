import { getEnvValue, isTrue } from "../helpers/configHelper";

export const REACT_APP_NAME = 'VITE_REACT_APP_NAME';
export const REACT_APP_VERSION = 'VITE_REACT_APP_VERSION';
export const REACT_APP_LOGO = 'VITE_REACT_APP_LOGO';

export const REACT_APP_ENABLE_LOGS = 'VITE_REACT_APP_ENABLE_LOGS';
export const REACT_WEB_ACCESSTOKEN = 'VITE_REACT_WEB_ACCESSTOKEN';
export const REACT_MAPBOXGL_ACCESSTOKEN = 'VITE_REACT_MAPBOXGL_ACCESSTOKEN';

const appName = ():string => getEnvValue(REACT_APP_NAME);
const appVersion = ():string => getEnvValue(REACT_APP_VERSION);
const appLogo = ():string => getEnvValue(REACT_APP_LOGO);

const enableLogs = ():Boolean => isTrue(REACT_APP_ENABLE_LOGS);

const webAccessToken = ():string => getEnvValue(REACT_WEB_ACCESSTOKEN);
const mapboxGLAccessToken = ():string => getEnvValue(REACT_MAPBOXGL_ACCESSTOKEN);

export { appName, appVersion, appLogo,
         webAccessToken, mapboxGLAccessToken,
         enableLogs }