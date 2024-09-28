// my-app/src/redux/workersSlice.js
import { createSlice } from '@reduxjs/toolkit';

const workersSlice = createSlice({
  name: 'workers',
  initialState: {
    workers: [],
    loading: false,
    error: null,
  },
  reducers: {
    getWorkersRequest(state) {
      state.loading = true;
    },
    getWorkersSuccess(state, action) {
      state.workers = action.payload;
      state.loading = false;
    },
    getWorkersFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { getWorkersRequest, getWorkersSuccess, getWorkersFailure } = workersSlice.actions;
export default workersSlice.reducer;