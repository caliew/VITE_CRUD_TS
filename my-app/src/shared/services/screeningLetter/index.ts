import { baseApi } from '@shared/utils/api/configs/rtkBaseQueryDemo';

import { getScreeningLetter } from './endpoints/getScreeningLetter';

export const getScreeningLetterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSflLetter: getScreeningLetter(builder),
  }),
});

export const { useGetSflLetterQuery } = getScreeningLetterApi;
