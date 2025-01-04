import { createApi } from '@reduxjs/toolkit/query/react';
import { REHYDRATE } from 'redux-persist';

import { axiosBaseQuery } from '@shared/utils/api/configs/rtkBaseQuery';
import { GET_FAMILY_URL } from '@shared/utils/api/configs/URL';
import { hasCcdpSuccess } from '@shared/utils/api/handlers/interpretCcdpCode/interpretCcdpCode';

import { GetUserProfileFamilyResponsePayload, IUserFamilyProfileResponse } from './types';

export const initialValuesUserFamilyProfile = {
  children: [],
  careDependants: [],
  userProfile: null,
};

export const getUserFamilyProfileApi = createApi({
  reducerPath: 'getUserFamilyProfileApi',
  baseQuery: axiosBaseQuery({
    url: GET_FAMILY_URL,
    defaultErrorMessage: 'Error getting user profile',
    isIncludedClientMessageId: true,
  }),
  extractRehydrationInfo: (action, { reducerPath }) => {
    if (action.type === REHYDRATE) {
      return action.payload?.[reducerPath];
    }
    return null;
  },
  endpoints: (builder) => ({
    getUserFamilyProfile: builder.query<IUserFamilyProfileResponse, void>({
      query: () => ({
        url: GET_FAMILY_URL,
        method: 'POST',
        data: {
          RequirePhoto: true,
        },
      }),
      transformResponse: (response: GetUserProfileFamilyResponsePayload) => {
        if (hasCcdpSuccess(response)) {
          return {
            children: response.Children.Profiles,
            careDependants: response.CareDependants.Profiles,
            userProfile: response.UserProfile,
          };
        }
        throw {
          message: response.Message,
          code: response.Code,
        };
      },
    }),
  }),
});

export const { useGetUserFamilyProfileQuery } = getUserFamilyProfileApi;
