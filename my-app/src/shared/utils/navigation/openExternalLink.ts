import { EXTERNAL_LINK_INTERCEPTION } from '@shared/constants/paths';

import { isPortalView } from '../layout';

export const openExternalLink = (url: string) => {
  if (isPortalView()) {
    window.open(url, '_blank', 'noopener,noreferrer');
  } else {
    window.open(`${url}?${EXTERNAL_LINK_INTERCEPTION}`);
  }
};
