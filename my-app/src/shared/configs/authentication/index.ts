import { CallbackSuccess, SessionLost, WholePageLoading } from '@shared/components';

import { OidcLocation } from './OidcLocation';
import { authAuthority, authClientId, authClientSecret, authRedirectURI, authScope } from '../configs/config';

export const AUTH_CONFIG = {
  sessionLostComponent: SessionLost,
  loadingComponent: WholePageLoading,
  authenticatingComponent: WholePageLoading,
  callbackSuccessComponent: CallbackSuccess,
  configuration: {
    client_id: authClientId(),
    redirect_uri: authRedirectURI(),
    scope: authScope(),
    authority: authAuthority(),
    refresh_time_before_tokens_expiration_in_second: 0,
    // TODO: Uncomment the following line to enable service worker
    // service_worker_relative_url: '/OidcServiceWorker.js',
    service_worker_only: false,
    token_request_extras: {
      client_secret: authClientSecret(),
    },
    token_renew_mode: 'id_token_invalid',
  },
  location: new OidcLocation(),
};
