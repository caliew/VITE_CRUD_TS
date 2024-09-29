import { configureStore } from '@reduxjs/toolkit';
import workersReducer from './features/workersSlice';
import restaurantsReducer from './features/restaurantsSlice';

const store = configureStore({
  reducer: {
    workers: workersReducer,
    restaurants: restaurantsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false,
  }),

});

export default store;