import { useOidc } from '@axa-fr/react-oidc';
import { useEffect } from 'react';

import { UNAUTHORISED_PATH } from '@shared/constants/paths';
import { isPortalView } from '@shared/utils/layout';
import { navigate } from '@shared/utils/navigation';
import { clearAllUserSession } from '@shared/utils/storage';

const SessionLost = () => {
  const { login } = useOidc();

  useEffect(() => {
    clearAllUserSession();

    if (!isPortalView) {
      navigate(UNAUTHORISED_PATH);
    } else {
      login();
    }
  }, [login]);

  return null;
};

export default SessionLost;
