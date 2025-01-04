import { LAYOUT_MOBILE } from '@shared/constants/constants';

/**
 * To identify if currently in mobile view
 *
 */
export const isMobileView = () =>
  !!(window.location.href && String(window.location.href).toLowerCase().indexOf(`/${LAYOUT_MOBILE.toLowerCase()}/`) >= 0);
