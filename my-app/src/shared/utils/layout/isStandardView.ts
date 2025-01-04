import { LAYOUT_STANDARD } from '@shared/constants/constants';

/**
 * To identify if currently in standard view
 *
 */
export const isStandardView = () =>
  window.location.href && String(window.location.href).toLowerCase().indexOf(`/${LAYOUT_STANDARD.toLowerCase()}/`) >= 0;
