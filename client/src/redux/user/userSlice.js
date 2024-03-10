import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.error = null;
      state.loading = false;
    },
    signInFailure: (state, action) => {
      state.currentUser = null;
      state.error = action.payload.message;
      state.loading = false;
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.error = null;
      state.loading = false;
    },
    UpdateUserFailure: (state, action) => {
      state.error = action.payload.message;
      state.loading = false;
    },
    deleteUserSuccess: (state) => {
      state.error = null;
      state.loading = false;
      state.currentUser = null;
    },
    deleteUserFailure: (state, action) => {
      state.error = action.payload.message;
      state.loading = false;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateUserSuccess,
  UpdateUserFailure,
  deleteUserSuccess,
  deleteUserFailure,
} = userSlice.actions;
export default userSlice.reducer;
