import { MOBILE_USER_AGENTS_REGEX } from '@shared/constants/regex';

export const isMobileBrowser = () => MOBILE_USER_AGENTS_REGEX.test(navigator.userAgent);
