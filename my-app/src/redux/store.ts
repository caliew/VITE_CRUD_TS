import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import workersReducer from './features/workersSlice';
import restaurantsReducer from './features/restaurantsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    workers: workersReducer,
    restaurants: restaurantsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false,
  }),

});

export default store;