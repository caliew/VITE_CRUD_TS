import { OidcClient } from '@axa-fr/react-oidc';
import axios from 'axios';
import { DEFAULT_LANG, I18N_KEY } from 'i18n';

import { ROOT_PATH, UNAUTHORISED_PATH } from '@shared/constants/paths';
import { isPortalView } from '@shared/utils/layout';
import { navigate } from '@shared/utils/navigation';

import { clearAllUserSession } from '../storage';

const initializeAxiosInterceptor = () => {
  axios.interceptors.request.use((config) => {
    config.data = {
      ...config?.data,
      Language: localStorage.getItem(I18N_KEY) ?? DEFAULT_LANG,
    };

    return config;
  });
  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const oidc = OidcClient.get();
      const isUnauthorised =
        (error.response != null && error.response !== undefined && error.response.status === 401) ||
        (error.response != null && error.response !== undefined && error.response.status === 403) ||
        error.message === 'Network Error';
      if (isPortalView() && isUnauthorised && oidc.tokens) {
        clearAllUserSession();
        await oidc.logoutAsync(ROOT_PATH);
        return false;
      }

      if (!isPortalView() && isUnauthorised) {
        clearAllUserSession();
        await oidc.logoutAsync();
        navigate(UNAUTHORISED_PATH);

        return false;
      }
      return Promise.reject(error);
    }
  );
};

export { initializeAxiosInterceptor };
