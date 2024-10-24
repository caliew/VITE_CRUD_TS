import { configureStore } from '@reduxjs/toolkit';
import visitorsReducer from './features/visitorsSlice';
import faciltiesReducer from './features/facilitiesSlice';
import bookingsReducer from './features/bookingsSlice';

const store = configureStore({
  reducer: {
    visitors: visitorsReducer,
    facilities: faciltiesReducer,
    bookings: bookingsReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false,
  }),

});

export default store;