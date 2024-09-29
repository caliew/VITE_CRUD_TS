import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getWorkers } from '../../utils/api/workers';

interface WorkersState {
  workers: any[];
  loading: boolean;
  error: any;
}

const initialState: WorkersState = {
  workers: [],
  loading: false,
  error: null,
};

export const fetchWorkers = createAsyncThunk('workers/fetchWorkers',
  async () => {
    const response = await getWorkers();
    return response;
  }
);

const workersSlice = createSlice({
  name: 'workers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWorkers.fulfilled, (state, action) => {
        state.loading = false;
        state.workers = action.payload;
      })
      .addCase(fetchWorkers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default workersSlice.reducer;