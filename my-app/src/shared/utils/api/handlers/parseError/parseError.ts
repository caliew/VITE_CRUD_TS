import { AxiosError } from 'axios';

import { IErrorResponse } from './ErrorResponse.types';

const FRONTEND_DUMMY_ERROR: IErrorResponse = { Message: null, Status: null, Code: null };

/**
 * Parse the error response object and returns a proper ErrorResponse object
 *
 * @param {unknown} error
 *   The Error being thrown when triggering API call
 * @param {string} defaultErrorMsg
 *   default frontend well-formatted error message for the calling API
 *
 * @returns {string}
 *   error response to be handled by UI
 */
const parseError = (error: unknown, defaultErrorMsg: string): IErrorResponse => {
  const defaultError: IErrorResponse = { ...FRONTEND_DUMMY_ERROR, Message: defaultErrorMsg };

  try {
    const errorResponse = (error as AxiosError)?.response;
    const errorData = errorResponse?.data as IErrorResponse;
    defaultError.Status = errorResponse?.status?.toString() || null;

    // if parsing failed, return default frontend Error Response
    if (!errorData) {
      console.error('Default Error', defaultErrorMsg);
      return defaultError;
    }
    // return error response from backend if it contains truthy Message field
    if (errorData.Message) {
      console.error('API error', errorData.Message);
      return errorData;
    }
    // return default frontend Error Response if backend error response does not contain Message

    console.error('Default error', defaultErrorMsg);
    return defaultError;
  } catch (error) {
    console.error('Parse Error - An error occurred');
    return defaultError;
  }
};

export { parseError };
