import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getRestaurants, 
  deleteRestaurant as apiDeleteRestaurant, 
  createRestaurant as apiAddRestaurant,
  updateRestaurant as apiUpdateRestaurant   } from '../../utils/api/restaurants';
import { Restaurant } from '../../models/Restaurant';

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
    console.log(response);
    return response;
  }
);

export const deleteRestaurant = createAsyncThunk('restaurants/deleteRestaurant',
  async (id: number) => {
    await apiDeleteRestaurant(id);
    const response = await getRestaurants();
    return response;
  }
);

export const updateRestaurant = createAsyncThunk('restaurants/updateRestaurant',
  async (restaurant: Restaurant) => {
    const response = await apiUpdateRestaurant(restaurant.id, restaurant);
    return response;
  }
);

export const addRestaurant = createAsyncThunk('restaurants/addRestaurant',
  async (restaurant: Restaurant) => {
    const response = await apiAddRestaurant(restaurant);
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
        state.restaurants = [];
        state.error = action.error.message;
      })
      .addCase(deleteRestaurant.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteRestaurant.fulfilled, (state, action) => {
        state.loading = false;
        state.restaurants = action.payload;
      })
      .addCase(deleteRestaurant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })      
      .addCase(updateRestaurant.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateRestaurant.fulfilled, (state, action) => {
        state.loading = false;
        const updatedRestaurants = state.restaurants.map((restaurant) => {
          if (restaurant.id === action.payload.id) {
            return action.payload;
          }
          return restaurant;
        });
        state.restaurants = updatedRestaurants;
      })
      .addCase(updateRestaurant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addRestaurant.pending, (state) => {
        state.loading = true;
      })
      .addCase(addRestaurant.fulfilled, (state, action) => {
        state.loading = false;
        state.restaurants = [...state.restaurants, action.payload];
      })
      .addCase(addRestaurant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default restaurantsSlice.reducer;