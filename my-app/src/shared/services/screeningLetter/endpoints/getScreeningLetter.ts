import { BuilderType } from '@shared/utils/api/configs/rtkBaseQueryDemo';
import { GET_HSG_SFLLETTER_URL } from '@shared/utils/api/configs/URL';
import { hasCcdpSuccess } from '@shared/utils/api/handlers/interpretCcdpCode/interpretCcdpCode';

import {
  ISFLLetterTextDetail,
  GetSflLetterRequestPayload,
  GetSflLetterResponsePayload,
} from '../types/getScreeningLetter.types';

export const getScreeningLetter = (builder: BuilderType) =>
  builder.query<ISFLLetterTextDetail, GetSflLetterRequestPayload>({
    query: (params) => ({
      url: GET_HSG_SFLLETTER_URL,
      method: 'POST',
      data: params,
    }),
    transformResponse: (response: GetSflLetterResponsePayload) => {
      if (hasCcdpSuccess(response)) {
        return response.Result.SFLLetterText;
      }

      throw {
        message: response.Message,
        code: response.Code,
      };
    },
  });
