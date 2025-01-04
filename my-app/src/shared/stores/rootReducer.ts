import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import WebSessionStorage from 'redux-persist/lib/storage/session';

import { getUserFamilyProfileApi } from '@shared/services/userProfile/getUserFamilyProfile';
import { baseApi } from '@shared/utils/api/configs/rtkBaseQueryDemo';
import { APP_NAME } from '@shared/utils/api/configs/URL';

import authReducer from './features/authSlice';
import workersReducer from '@features/Worker/stores/workerSlice';
import restaurantsReducer from '@features/Restaurant/stores/restaurantSlice';
import iotPortalReducer from '@features/IOTPortal/stores/iotPortalSlice';

import userReducer from './user/userSlice';

const persistConfig = {
  key: `${APP_NAME}-app-root`,
  storage: WebSessionStorage,
  blacklist: ['healthProfile', 'auth', 'getOptInOutDetailsApi', 'updateOptInOutStatusApi'],
};

const rootReducer = combineReducers({
    auth: authReducer,
    workers: workersReducer,
    restaurants: restaurantsReducer,
    iotPortal: iotPortalReducer,
  [getUserFamilyProfileApi.reducerPath]: getUserFamilyProfileApi.reducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);
