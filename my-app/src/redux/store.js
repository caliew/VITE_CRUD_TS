// my-app/src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import workersReducer from './workersSlice';
import restaurantsReducer from './restaurantsSlice';

const store = configureStore({
  reducer: {
    workers: workersReducer,
    restaurants: restaurantsReducer,
  },
});

export default store;