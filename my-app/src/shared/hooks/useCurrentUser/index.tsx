import { useOidc } from '@axa-fr/react-oidc';

import { SOURCE_MYINFO } from '@shared/constants/constants';
import { personalHealthApi, useGetPersonalUserProfileQuery } from '@shared/services/personalHealth';
import { useAppDispatch } from '@shared/stores/rootTypes';
import { isDev } from '@shared/utils/environment';

const useCurrentUser = (skip: boolean = false) => {
  const dispatch = useAppDispatch();

  const isAuthenticated = useOidc().isAuthenticated || isDev();
  const {
    data: userProfile,
    isFetching,
    isLoading,
    refetch: refetchUser,
  } = useGetPersonalUserProfileQuery(undefined, {
    skip: !isAuthenticated || skip,
  });

  const hasNoEmailAndPhoneNumber = !userProfile?.Profile?.Email && !userProfile?.Profile?.ContactNumber;

  const hasNoEmailOrPhoneNumber = !userProfile?.Profile?.Email || !userProfile?.Profile?.ContactNumber;

  const hasNoPhoneNumber = !userProfile?.Profile?.ContactNumber;

  const hasFilledMyInfo = userProfile?.Profile?.Source === SOURCE_MYINFO && !!userProfile?.Profile?.MyInfoLastRetrieved;

  const clearUserProfile = () => {
    dispatch(personalHealthApi.util.invalidateTags(['UserProfile']));
  };

  return {
    userProfile: userProfile?.Profile,
    loading: isFetching || isLoading,
    hasNoPhoneNumber,
    hasNoEmailAndPhoneNumber,
    hasNoEmailOrPhoneNumber,
    hasFilledMyInfo,
    clearUserProfile,
    refetchUser,
  };
};

export default useCurrentUser;
