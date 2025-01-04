import { IAppServices } from '@shared/services/systemSettings/types/getAppServices.types';

export const MEDICATIONS = 'PH_Medications';

export const PAYMENT_AND_FINANCIAL = 'PH_Payments_and_Financials';

export const HEALTH_RECORDS = 'PH_Health_Records';

export const HEALTH_ASSESSMENT = 'PH_Health_Risk';

export const CONSENT_AND_PERMISSION = 'PH_Consents_and_Permissiononly';

export const SCHOOL = 'Children_School';

export const CHILDREN_HEALTH_RECORDS = 'Children_Health_Records';

export const CHILDREN_CONSENT_AND_PERMISSION = 'Children_Consents_and_Permission';

export const CHILDREN_PAYMENTS_AND_FINANCIAL = 'Children_Payments_and_Financials';

export const CHILDREN_MEDICATIONS = 'Children_Medications';

export const FF_HEALTH_RECORDS = 'FF_Health_Records';

export const FF_HEALTH_ASSESSMENT = 'FF_Health_Risk';

export const FF_MEDICATIONS = 'FF_Medications';

export const FF_PAYMENTS_AND_FINANCIAL = 'FF_Payments_and_Financials';

export const defaultAppServiceState: IAppServices = {
  isLoading: false,
  errorMsg: null,
  errorCode: null,
  data: [],
  dateTimeRetrieved: null,
};
