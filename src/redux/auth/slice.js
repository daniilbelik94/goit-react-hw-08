import { createSlice } from '@reduxjs/toolkit';
import {
  apiGetCurrentUser,
  apiLoginUser,
  apiLogOutUser,
  apiRgisterUser,
} from './operations';

const INITIAL_STATE = {
  userData: null,
  isLoading: false,
  error: null,
  token: null,
  isRefreshing: false,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  extraReducers: (builder) =>
    builder
      .addCase(apiRgisterUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(apiRgisterUser.fulfilled, (state, actions) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.token = actions.payload.token;
        state.userData = actions.payload.user;
      })
      .addCase(apiRgisterUser.rejected, (state, actions) => {
        state.isLoading = false;
        state.error = actions.payload;
      })
      //
      .addCase(apiLoginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(apiLoginUser.fulfilled, (state, actions) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.token = actions.payload.token;
        state.userData = actions.payload.user;
      })
      .addCase(apiLoginUser.rejected, (state, actions) => {
        state.isLoading = false;
        state.error = actions.payload;
      })
      //
      .addCase(apiGetCurrentUser.pending, (state) => {
        state.isRefreshing = true;
        state.error = null;
      })
      .addCase(apiGetCurrentUser.fulfilled, (state, actions) => {
        state.isRefreshing = false;
        state.isLoggedIn = true;
        state.userData = actions.payload;
      })
      .addCase(apiGetCurrentUser.rejected, (state, actions) => {
        state.isRefreshing = false;
        state.error = actions.payload;
      }) //
      .addCase(apiLogOutUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(apiLogOutUser.fulfilled, () => {
        return INITIAL_STATE;
      })
      .addCase(apiLogOutUser.rejected, (state, actions) => {
        state.isLoading = false;
        state.error = actions.payload;
      }),
});

export const authReducer = authSlice.reducer;
