import { LAYOUT_MOBILE, LAYOUT_PORTAL, LAYOUT_STANDARD } from '@shared/constants/constants';

export const redirectViewOptions = (
  layout: string,
  navigateCommon?: () => void,
  navigateMobile?: () => void,
  navigateStandard?: () => void
) => {
  if (layout === LAYOUT_PORTAL) {
    navigateCommon?.();
  }
  if (layout === LAYOUT_MOBILE) {
    navigateMobile?.();
  }
  if (layout === LAYOUT_STANDARD) {
    navigateStandard?.();
  }
};
