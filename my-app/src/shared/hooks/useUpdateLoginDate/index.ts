import { useOidcIdToken } from '@axa-fr/react-oidc';
import { useEffect } from 'react';

import { useUpdateLoginDateMutation } from '@shared/services/userProfile';
import { useAppDispatch, useAppSelector } from '@shared/stores/rootTypes';
import { loginDateSelector } from '@shared/stores/user/userSelector';
import { userAction } from '@shared/stores/user/userSlice';
import { isMobileView } from '@shared/utils/layout';

const useUpdateLoginDate = () => {
  const { idTokenPayload } = useOidcIdToken();
  const dispatch = useAppDispatch();
  const loginDate = useAppSelector(loginDateSelector);

  const [updateLoginDate, { isLoading }] = useUpdateLoginDateMutation();

  useEffect(() => {
    if (idTokenPayload?.iat && idTokenPayload.iat !== loginDate) {
      if (!isMobileView()) {
        updateLoginDate();
      }
      dispatch(userAction.setLoginDate(idTokenPayload.iat));
    }
  }, [loginDate, idTokenPayload, dispatch, updateLoginDate]);

  return {
    isLoading,
  };
};

export default useUpdateLoginDate;
