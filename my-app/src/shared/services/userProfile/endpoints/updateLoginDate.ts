import { BuilderType } from '@shared/utils/api/configs/rtkBaseQueryDemo';
import { UPDATE_LOGIN_URL } from '@shared/utils/api/configs/URL';
import { hasCcdpSuccess } from '@shared/utils/api/handlers/interpretCcdpCode/interpretCcdpCode';
import { GenericApiResponse } from '@shared/utils/api/types';

import { UpdateLoginDateData, UpdateLoginDateResult } from '../types/updateLoginDate.types';

export const updateLoginDate = (builder: BuilderType) =>
  builder.mutation<UpdateLoginDateData, void>({
    query: () => ({
      url: UPDATE_LOGIN_URL,
      method: 'POST',
      data: { RequirePhoto: true },
    }),
    transformResponse: (response: GenericApiResponse<UpdateLoginDateResult>) => {
      if (hasCcdpSuccess(response)) {
        return response.Result.Data;
      }

      throw {
        message: response.Message,
        code: response.Code,
      };
    },
  });
