import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getRestaurants } from '../../utils/api/restaurants';

interface RestaurantsState {
  restaurants: any[];
  loading: boolean;
  error: any;
}

const initialState: RestaurantsState = {
  restaurants: [],
  loading: false,
  error: null,
};

export const fetchRestaurants = createAsyncThunk('restaurants/fetchRestaurants',
  async () => {
    const response = await getRestaurants();
    return response;
  }
);

const restaurantsSlice = createSlice({
  name: 'restaurants',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurants.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.loading = false;
        state.restaurants = action.payload;
      })
      .addCase(fetchRestaurants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default restaurantsSlice.reducer;