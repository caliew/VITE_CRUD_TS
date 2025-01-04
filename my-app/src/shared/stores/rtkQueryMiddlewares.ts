import { Middleware } from '@reduxjs/toolkit';

import { getScreeningLetterApi } from '@shared/services/screeningLetter';
import { getUserFamilyProfileApi } from '@shared/services/userProfile/getUserFamilyProfile';

const rtkQueryMiddlewares: Middleware[] = [
  getUserFamilyProfileApi.middleware,

  // Appointment
  getScreeningLetterApi.middleware,
];

export default rtkQueryMiddlewares;
