// my-app/src/redux/restaurantsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const restaurantsSlice = createSlice({
  name: 'restaurants',
  initialState: {
    restaurants: [],
    loading: false,
    error: null,
  },
  reducers: {
    getRestaurantsRequest(state) {
      state.loading = true;
    },
    getRestaurantsSuccess(state, action) {
      state.restaurants = action.payload;
      state.loading = false;
    },
    getRestaurantsFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { getRestaurantsRequest, getRestaurantsSuccess, getRestaurantsFailure } = restaurantsSlice.actions;
export default restaurantsSlice.reducer;