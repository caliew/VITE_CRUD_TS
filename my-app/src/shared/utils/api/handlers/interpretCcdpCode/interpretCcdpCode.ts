const CCDP_SUCCESS_CODE = 'S';
const CCDP_PARTIAL_SUCCESS_CODE = 'W';

export const hasCcdpSuccess = (payload: any) => {
  if (payload) {
    if (payload.Status) return payload.Status === CCDP_SUCCESS_CODE;
    return false;
  }
  return false;
};
export const hasCcdpPartialSuccess = (payload: any) => {
  if (payload) {
    return payload.Status === CCDP_PARTIAL_SUCCESS_CODE;
  }
  return false;
};
