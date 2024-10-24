import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFacilities } from '../../utils/api/facilities';

interface FacilitiesState {
  facilities: any[];
  loading: boolean;
  error: any;
}

const initialState: FacilitiesState = {
  facilities: [],
  loading: false,
  error: null,
};

export const fetchFacilities = createAsyncThunk('facilities/fetchFacilities',
  async () => {
    const response = await getFacilities();
    return response;
  }
);

const facilitiesSlice = createSlice({
  name: 'facilities',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFacilities.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFacilities.fulfilled, (state, action) => {
        state.loading = false;
        state.facilities = action.payload;
      })
      .addCase(fetchFacilities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default facilitiesSlice.reducer;