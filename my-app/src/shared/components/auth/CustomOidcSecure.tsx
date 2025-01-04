/* eslint-disable react/jsx-no-useless-fragment */
import { OidcClient, StringMap } from '@axa-fr/react-oidc';
import { PropsWithChildren, memo, useEffect } from 'react';

import { isDev } from '@shared/utils/environment';

interface CustomOidcSecureProps {
  callbackPath?: string;
  extras?: StringMap;
  configurationName?: string;
  isDisabled?: boolean;
}

const CustomOidcSecure = ({
  callbackPath,
  children,
  configurationName,
  extras,
  isDisabled = isDev(),
}: PropsWithChildren<CustomOidcSecureProps>) => {
  const oidc = OidcClient.get(configurationName);

  useEffect(() => {
    if (!oidc.tokens && !isDisabled) {
      setTimeout(() => {
        oidc.loginAsync(callbackPath, extras);
      }, 1000);
    }
  }, [configurationName, callbackPath, extras, oidc, isDisabled]);

  if (isDisabled) {
    return <>{children}</>;
  }

  if (!oidc.tokens) {
    return null;
  }

  return <>{children}</>;
};

export default memo(CustomOidcSecure);
