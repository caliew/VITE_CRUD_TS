import { useOidc } from '@axa-fr/react-oidc';

import useCurrentUser from '../useCurrentUser';
import useRelatedPeople from '../useRelatedPeople';
import useUpdateLoginDate from '../useUpdateLoginDate';

const useGlobalLoading = () => {
  const { isAuthenticated } = useOidc();

  const { isLoading: isUpdateLoginDateLoading } = useUpdateLoginDate();

  const { loading: isLoadingUserProfile, userProfile } = useCurrentUser(!isAuthenticated || isUpdateLoginDateLoading);

  const { isLoading: isLoadingRelatedPeople } = useRelatedPeople({
    skip: !isAuthenticated || isUpdateLoginDateLoading,
  });

  return isAuthenticated && (isLoadingUserProfile || !userProfile || isLoadingRelatedPeople);
};

export default useGlobalLoading;
