import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getVisitors } from '../../utils/api/visitors';

interface VisitorsState {
  visitors: any[];
  loading: boolean;
  error: any;
}

const initialState: VisitorsState = {
  visitors: [],
  loading: false,
  error: null,
};

export const fetchVisitors = createAsyncThunk('visitors/fetchVisitors',
  async () => {
    const response = await getVisitors();
    return response;
  }
);

const visitorsSlice = createSlice({
  name: 'visitors',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVisitors.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchVisitors.fulfilled, (state, action) => {
        state.loading = false;
        state.visitors = action.payload;
      })
      .addCase(fetchVisitors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default visitorsSlice.reducer;