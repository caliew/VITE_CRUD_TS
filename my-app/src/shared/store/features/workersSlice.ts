import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getWorkers, 
  createWorker as apiAddWorker,
  deleteWorker as apiDeleteWorker, 
  updateWorker as apiUpdateWorker,
  getWorkersByRestaurantId  } from '@shared/api';

interface WorkersState {
  workers: any[];
  workersByRestaurantId: any[];
  isLoading: boolean;
  error: any;
}

const initialState: WorkersState = {
  workers: [],
  workersByRestaurantId: [],
  isLoading: false,
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
    await apiDeleteWorker(id);
    const response = await getWorkers();
    return response;
  }
);

export const updateWorker = createAsyncThunk('workers/updateWorker',
  async (worker: Worker) => {
    const response = await apiUpdateWorker(worker.id, { ...worker, restaurantId: Number(worker.restaurantId) });
    return response;
  }
);

export const addWorker = createAsyncThunk('workers/addWorker',
  async (worker: Worker) => {
    const response = await apiAddWorker(worker);
    return response;
  }
);

export const fetchWorkersByRestaurantId = createAsyncThunk(
  'workers/fetchWorkersByRestaurantId',
  async (restaurantId: number) => {
    const response = await getWorkersByRestaurantId(restaurantId);
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
        state.isLoading = true;
      })
      .addCase(fetchWorkers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.workers = action.payload;
      })
      .addCase(fetchWorkers.rejected, (state, action) => {
        state.isLoading = false;
        state.workers = [];
        state.error = action.error.message;
      })
      .addCase(deleteWorker.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteWorker.fulfilled, (state, action) => {
        state.isLoading = false;
        state.workers = action.payload;
      })
      .addCase(deleteWorker.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchWorkersByRestaurantId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchWorkersByRestaurantId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.workersByRestaurantId  = action.payload;
      })
      .addCase(fetchWorkersByRestaurantId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });      
  },
});

export default workersSlice.reducer;