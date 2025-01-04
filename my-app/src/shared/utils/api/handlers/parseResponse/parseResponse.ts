// @ts-nocheck
import { AxiosResponse } from 'axios';

import { PAYLOAD_UNDEFINED_ERROR_MESSAGE, PAYLOAD_NULL_ERROR_MESSAGE } from '../../../../services/errorMessage';

/**
 * Validates the Axios response object and returns its data payload
 *
 * @param {AxiosResponse<T>} response
 *   The Axios response object that contains a data payload that's
 *   defined by the generic type passed to this method
 * @param {string} URL
 *   URL of the API endpoint we are querying against
 *   Used for more informational error messages if they occur
 *
 * @returns {T}
 *   The Axios response object's "data" field that contains the data object
 *   that's returned from the external API endpoint. This data object is of
 *   the schema of the generic type passed to this method
 */
const parseResponse = <T>(response: AxiosResponse<T>, isErrMsgConcatErrCode = true): T => {
  const errorCode = response.data ? response.data.Code : '';
  const headerResponseId = response.headers ? response.headers['x-amzn-requestid'] : '';
  let internalErrorCode = '';
  if (isErrMsgConcatErrCode) {
    if (errorCode && headerResponseId) {
      internalErrorCode = `(${errorCode}-${headerResponseId.slice(0, 8)})`;
    } else if (errorCode) {
      internalErrorCode = `(${errorCode})`;
    } else if (headerResponseId) {
      internalErrorCode = `(${headerResponseId.slice(0, 8)})`;
    }
  }

  if (response.data === undefined) {
    const msg = PAYLOAD_UNDEFINED_ERROR_MESSAGE;
    console.error(`${msg}${internalErrorCode}`);
    throw new Error(`${msg}${internalErrorCode}`);
  } else if (response.data === null) {
    const msg = PAYLOAD_NULL_ERROR_MESSAGE;
    console.error(`${msg}${internalErrorCode}`);
    throw new Error(`${msg}${internalErrorCode}`);
  } else {
    return {
      ...response.data,
      Message: response.data.Message ? `${response.data.Message} ${internalErrorCode}` : '',
      InternalErrorCode: internalErrorCode,
    };
  }
};

export { parseResponse };
