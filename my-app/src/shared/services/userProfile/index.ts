import { baseApi } from '@shared/utils/api/configs/rtkBaseQueryDemo';

import { updateLoginDate } from './endpoints';

const userProfileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateLoginDate: updateLoginDate(builder),
  }),
});

export const { useUpdateLoginDateMutation } = userProfileApi;
