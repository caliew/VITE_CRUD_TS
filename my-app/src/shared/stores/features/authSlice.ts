// authSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi, getAccessCode } from "@shared/api";
import { GetJWTToken, RemoveJWTToken } from "@shared/utils";

interface AuthState {
  token: string | null;
  accessCode: string | null;
  error: string | null;
  isLoading: boolean;
}

const initialState: AuthState = {
  token: null,
  accessCode: null,
  error: null,
  isLoading: false,
};

export const login = createAsyncThunk(
  "auth/login",
  async (credentials: any) => {
    try {
      const response = await loginApi(credentials);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      RemoveJWTToken();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = GetJWTToken();
        state.accessCode = getAccessCode();
        state.error = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
