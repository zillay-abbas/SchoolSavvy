import { createSlice } from "@reduxjs/toolkit";

const userFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const initialState = {
  isAuthenticated: userFromLocalStorage ? true : false,
  token: userFromLocalStorage?.token,
  detail: userFromLocalStorage?.user,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loadingRequest(state) {
      state.loading = true;
    },

    loginSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.detail = action.payload.user;
      state.token = action.payload.token;
      state.msg = action.payload.msg;
    },
    loginFailure(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.msg = action.payload.data.msg;
    },

    loadPlanSuccess(state, action) {
      state.loading = false;
      state.error = action.payload.error;
      state.isDialog = action.payload.isDialog;
      Object.assign(state.plan, action.payload.plan);
    },
    loadPlanFailure(state, action) {
      state.loading = false;
      state.error = action.payload.error;
      state.isDialog = action.payload.isDialog;
      state.msg = action.payload.msg;
    },

    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.detail = null;
      state.msg = null;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
