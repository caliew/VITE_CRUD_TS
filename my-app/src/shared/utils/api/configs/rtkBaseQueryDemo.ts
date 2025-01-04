import { SerializedError } from '@reduxjs/toolkit';
import { BaseQueryFn } from '@reduxjs/toolkit/dist/query';
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query';
import { createApi } from '@reduxjs/toolkit/query/react';
import axios, { AxiosRequestConfig } from 'axios';
import { REHYDRATE } from 'redux-persist';

import { getRequestOptions } from '@shared/utils/api/configs/requestOption';
import { parseResponse } from '@shared/utils/api/handlers/parseResponse/parseResponse';

export interface BaseQueryFnArgument {
  isErrMsgConcatErrCode?: boolean;
  url: string;
  method: AxiosRequestConfig['method'];
  data?: AxiosRequestConfig['data'];
  params?: AxiosRequestConfig['params'];
}

export type BuilderType<T extends string = string> = EndpointBuilder<
  BaseQueryFn<BaseQueryFnArgument, unknown, SerializedError, unknown>,
  T,
  string
>;

interface AxiosBaseQuery {
  isIncludedClientMessageId?: boolean;
}

const axiosBaseQueryDemo =
  ({
    isIncludedClientMessageId,
  }: AxiosBaseQuery): BaseQueryFn<BaseQueryFnArgument, unknown, SerializedError, unknown> =>
  async ({ data, isErrMsgConcatErrCode, method, params, url }) => {
    try {
      const response = await axios({
        url,
        method,
        data,
        params,
        ...getRequestOptions(true, isIncludedClientMessageId),
      });

      return { data: parseResponse(response, isErrMsgConcatErrCode) };
    } catch (error) {
      return {
        error: {
          message: (error as Error).message,
          code: '',
        },
      };
    }
  };

export const baseApi = createApi({
  reducerPath: 'baseApi',
  refetchOnMountOrArgChange: 600,
  baseQuery: axiosBaseQueryDemo({
    isIncludedClientMessageId: true,
  }),
  extractRehydrationInfo: (action, { reducerPath }) => {
    if (action.type === REHYDRATE) {
      return action.payload?.[reducerPath];
    }
    return undefined;
  },
  endpoints: () => ({}),
});
