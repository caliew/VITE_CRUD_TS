import { configureStore, Middleware } from "@reduxjs/toolkit";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistStore } from "redux-persist";
import { baseApi } from '@shared/utils/api/configs/rtkBaseQueryDemo';

import authReducer from "./features/authSlice";
import workersReducer from "@features/Worker/stores/workerSlice";
import restaurantsReducer from "@features/Restaurant/stores/restaurantSlice";
import iotPortalReducer from "@features/IOTPortal/stores/iotPortalSlice";

import { persistedReducer } from './rootReducer';
import rtkQueryMiddlewares from './rtkQueryMiddlewares';

const middlewares: Middleware[] = [baseApi.middleware];

export const store = configureStore({
  reducer: {
    auth: authReducer,
    workers: workersReducer,
    restaurants: restaurantsReducer,
    iotPortal: iotPortalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
});

export const persistor = persistStore(store);
