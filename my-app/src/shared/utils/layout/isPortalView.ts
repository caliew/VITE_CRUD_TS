import { isMobilePublicView } from './isMobilePublicView';
import { isMobileView } from './isMobileView';
import { isStandardView } from './isStandardView';

/**
 * To identify if currently in portal view
 *
 */
export const isPortalView = () => !isStandardView() && !isMobileView() && !isMobilePublicView();
