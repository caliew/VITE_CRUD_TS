import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UserState, ISelectedProfile } from './user.types';

// Initial state occurring when user is not initialized yet
// All fields should be NULL when not logged in yet.
export const initialState: UserState = {
  sourceApp: null,
  selectedProfile: null,
  loginDate: undefined,
};

/**
 * The slice   reducer for the part of state that represents the logged in user.
 * Contains the management of user information.
 */
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUserState(state) {
      Object.assign(state, initialState);
    },
    setSelectedProfile: (state, action: PayloadAction<ISelectedProfile>) => {
      state.selectedProfile = action.payload;
    },
    resetSelectedProfile: (state) => {
      state.selectedProfile = null;
    },
    setSourceApp: (state, action: PayloadAction<string>) => {
      state.sourceApp = action.payload;
    },
    setLoginDate: (state, action: PayloadAction<number | undefined>) => {
      state.loginDate = action.payload;
    },
  },
});

export const { actions: userAction } = userSlice;

export default userSlice.reducer;
