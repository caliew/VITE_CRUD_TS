import { getEnvValue, isTrue } from "../helpers/configHelper";

export const REACT_APP_ENABLE_LOGS = 'VITE_REACT_APP_ENABLE_LOGS';
export const REACT_APP_NAME = 'VITE_REACT_APP_NAME';

const appName = ():string => getEnvValue(REACT_APP_NAME);
const enableLogs = ():Boolean => isTrue(REACT_APP_ENABLE_LOGS);

export { appName, enableLogs }