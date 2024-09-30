import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getWorkers, deleteWorker as apiDeleteWorker, updateWorker as apiUpdateWorker } from '../../utils/api/workers';

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

export const deleteWorker = createAsyncThunk('workers/deleteWorker',
  async (id: number) => {
    console.log(`..DELETE WORKERS....${id}`)
    await apiDeleteWorker(id);
    const response = await getWorkers();
    console.log(response);
    return response;
  }
);

export const updateWorker = createAsyncThunk('workers/updateWorker',
  async (worker: Worker) => {
    console.log('UPDATE WORKER...');
    console.log(worker)
    const response = await apiUpdateWorker(worker.id, worker);
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
      })
      .addCase(deleteWorker.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteWorker.fulfilled, (state, action) => {
        state.loading = false;
        state.workers = action.payload;
      })
      .addCase(deleteWorker.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });      
  },
});

export default workersSlice.reducer;