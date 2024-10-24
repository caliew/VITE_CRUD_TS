import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getBookings, createBooking, updateBooking, deleteBooking } from '../../utils/api/bookings';

interface BookingsState {
  bookings: any[];
  loading: boolean;
  error: any;
}

const initialState: BookingsState = {
  bookings: [],
  loading: false,
  error: null,
};

export const fetchBookings = createAsyncThunk('bookings/fetchBookings',
  async () => {
    const response = await getBookings();
    return response;
  }
);

export const createBookingAsync = createAsyncThunk('bookings/createBooking',
  async (booking: any) => {
    const response = await createBooking(booking);
    return response;
  }
);

export const updateBookingAsync = createAsyncThunk('bookings/updateBooking',
  async (booking: any) => {
    const response = await updateBooking(booking);
    return response;
  }
);

export const deleteBookingAsync = createAsyncThunk('bookings/deleteBooking',
  async (id: number) => {
    const response = await deleteBooking(id);
    return response;
  }
);

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createBookingAsync.fulfilled, (state, action) => {
        state.bookings.push(action.payload);
      })
      .addCase(updateBookingAsync.fulfilled, (state, action) => {
        const index = state.bookings.findIndex((booking) => booking.id === action.payload.id);
        if (index !== -1) {
          state.bookings[index] = action.payload;
        }
      })
      .addCase(deleteBookingAsync.fulfilled, (state, action) => {
        const index = state.bookings.findIndex((booking) => booking.id === action.payload);
        if (index !== -1) {
          state.bookings.splice(index, 1);
        }
      });
  },
});

export default bookingsSlice.reducer;