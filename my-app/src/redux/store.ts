import { configureStore } from '@reduxjs/toolkit';
import workersReducer from './features/workersSlice';
import restaurantsReducer from './features/restaurantsSlice';
import visitorsReducer from './features/visitorsSlice';
import faciltiesReducer from './features/facilitiesSlice';
import bookingsReducer from './features/bookingsSlice';

const store = configureStore({
  reducer: {
    workers: workersReducer,
    restaurants: restaurantsReducer,
    visitors: visitorsReducer,
    facilities: faciltiesReducer,
    bookings: bookingsReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false,
  }),

});

export default store;