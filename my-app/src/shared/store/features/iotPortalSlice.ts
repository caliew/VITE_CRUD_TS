import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getIOTPortal } from '@shared/api';

interface IOTPortalState {
  iotPortal: any | null;
  isLoading: boolean;
  error: any;
}

const initialState: IOTPortalState = {
  iotPortal: {},
  isLoading: false,
  error: null,
};


export const fetchIOTPortal = createAsyncThunk('iotportal/fetchIOTPortal',
  async () => {
    const response = await getIOTPortal();
    return response;
  }
);


const iotPortalSlice = createSlice({
  name: 'iotPortal',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIOTPortal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchIOTPortal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.iotPortal = action.payload;
      })
      .addCase(fetchIOTPortal.rejected, (state, action) => {
        state.isLoading = false;
        state.iotPortal = null;
        state.error = action.error.message;
      })
  },
});

export default iotPortalSlice.reducer;