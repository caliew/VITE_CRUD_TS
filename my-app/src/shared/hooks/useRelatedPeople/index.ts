import { useGetRelatedPeopleQuery } from '@shared/services/caregivers';
import { RelatedPersonType } from '@shared/services/caregivers/types/getRelatedPeople.types';

interface Props {
  relatedPersonType?: RelatedPersonType;
  skip?: boolean;
}

const useRelatedPeople = (props?: Props) => {
  const {
    data: relatedPeopleData,
    error: relatedPeopleError,
    isFetching: isFetchingRelatedPeople,
    isLoading: isLoadingRelatedPeople,
  } = useGetRelatedPeopleQuery(
    {
      RelatedPersonType: props?.relatedPersonType || RelatedPersonType.ALL,
      Sort: 0,
    },
    {
      skip: props?.skip,
    }
  );

  return {
    data: relatedPeopleData,
    error: relatedPeopleError,
    isFetching: isFetchingRelatedPeople,
    isLoading: isLoadingRelatedPeople,
  };
};

export default useRelatedPeople;
