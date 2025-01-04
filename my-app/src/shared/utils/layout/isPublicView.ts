import { LAYOUT_PUBLIC } from '@shared/constants/constants';

export const isPublicView = () =>
  window.location.href && window.location.href.toLowerCase().indexOf(`/${LAYOUT_PUBLIC.toLowerCase()}/`) >= 0;
