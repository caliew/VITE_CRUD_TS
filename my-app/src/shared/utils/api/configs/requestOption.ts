import { OidcClient } from '@axa-fr/react-oidc';
import { CancelToken } from 'axios';
import { v4 as uuid } from 'uuid';

import { isPortalView, isPublicView, isStandardView } from '@shared/utils/layout';

import { API_KEY } from './URL';

const CONTENT_TYPE = 'application/json';

/**
 * Formats the Standardized API Request options used for all API calls.
 *
 * Pre-condition:
 *   The store must be updated with the relevant values below in order for them to be extracted
 *   correctly during API calls. This is important because API calls could theoretically occur
 *   before the store is instantiated and completely mapped with data values.
 *
 * @returns {Object} Axios compatible HTTP header object
 */

const getRequestOptions = (withCredentials: boolean, IsIncludeClientMessageId = true) => {
  const guid = uuid();
  const oidc = OidcClient.get();

  if (isPortalView() || isStandardView() || isPublicView()) {
    return {
      withCredentials,
      headers: {
        'Content-Type': CONTENT_TYPE,
        'x-api-key': API_KEY,
        'x-hh-agent': `portal-hhngreact`,
        // TODO: JASON Add Source after CAM
        Authorization: !isPublicView() ? `Bearer ${oidc.tokens?.accessToken}` : '',
        'X-HH-SourceApp': 'hh_web',
        ...(IsIncludeClientMessageId && { 'X-HH-MessageId': guid }),
      },
    };
  }

  return {
    headers: {
      'Content-Type': CONTENT_TYPE,
      'x-api-key': API_KEY,
      ...(IsIncludeClientMessageId && { 'X-HH-MessageId': guid }),
      'x-hh-agent': '',
      // TODO: JASON Add Source after CAM
      Authorization: `Bearer ${oidc.tokens?.accessToken}`,
      'X-HH-SourceApp': 'hh_web',
      'x-hh-param1': '',
      'x-hh-param2': '',
    },
  };
};

const getRequestOptionsWithCancelToken = (ctoken: CancelToken) => ({
  // withCredentials: true,
  headers: {
    'Content-Type': CONTENT_TYPE,
    'x-api-key': API_KEY,
    // TODO: JASON Add Source after CAM
    'X-HH-SourceApp': 'hh_web',
    'x-hh-param1': '',
    'x-hh-param2': '',
    'x-hh-agent': '',
  },
  cancelToken: ctoken,
});

export { getRequestOptions, getRequestOptionsWithCancelToken };
