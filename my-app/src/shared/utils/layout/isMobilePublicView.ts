import { LAYOUT_MOBILE, LAYOUT_PUBLIC } from '@shared/constants/constants';

export const isMobilePublicView = () =>
  window.location.href &&
  String(window.location.href).toLowerCase().indexOf(`/${LAYOUT_MOBILE.toLowerCase()}/`) >= 0 &&
  String(window.location.href).toLowerCase().indexOf(`/${LAYOUT_PUBLIC.toLowerCase()}/`) >= 0;
