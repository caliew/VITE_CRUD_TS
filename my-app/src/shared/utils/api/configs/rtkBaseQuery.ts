import { SerializedError } from '@reduxjs/toolkit';
import { BaseQueryFn } from '@reduxjs/toolkit/query';
import axios, { AxiosRequestConfig } from 'axios';

import { getRequestOptions } from '@shared/utils/api/configs/requestOption';

import { parseResponse } from '../handlers/parseResponse/parseResponse';

interface AxiosBaseQuery {
  url: string;
  defaultErrorMessage: string;
  headers?: AxiosRequestConfig['headers'];
  isIncludedClientMessageId?: boolean;
  isErrMsgConcatErrCode?: boolean;
}

export const axiosBaseQuery =
  ({
    defaultErrorMessage,
    isErrMsgConcatErrCode,
    isIncludedClientMessageId,
    url,
  }: AxiosBaseQuery): BaseQueryFn<
    {
      method: AxiosRequestConfig['method'];
      data?: AxiosRequestConfig['data'];
      params?: AxiosRequestConfig['params'];
    },
    unknown,
    SerializedError,
    unknown
  > =>
  async ({ data, method, params }) => {
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
          message: (error as Error).message || defaultErrorMessage,
          code: '',
        },
      };
    }
  };
