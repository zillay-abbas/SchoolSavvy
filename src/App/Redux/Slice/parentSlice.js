import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  all: [],
  loading: false,
};

const parentSlice = createSlice({
  name: "parent",
  initialState,
  reducers: {
    loadingRequest: (state) => {
      state.loading = true;
    },

    onFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload.response.data.error;
      state.isDialog = action.payload.response.data.isDialog;
      state.msg = action.payload.response.data.msg;
    },

    parentCreateSuccess: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
      state.isDialog = action.payload.isDialog;
      state.msg = action.payload.msg;
      if (state.hasOwnProperty("all")) {
        state.all.push(action.payload.parent);
      } else {
        state.all = [];
        state.all.push(action.payload.parent);
      }
    },

    parentLoadSuccess: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
      state.all = action.payload.parents;
    },

    parentUpdateSuccess: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
      state.isDialog = action.payload.isDialog;
      state.msg = action.payload.msg;
      state.all = state.all.map((parent) =>
        parent.user_id === action.payload.user.user_id
          ? action.payload.user
          : parent
      );
    },

    parentRemoveSuccess: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
      state.isDialog = action.payload.isDialog;
      state.msg = action.payload.msg;
      state.all = state.all.filter(
        (parent) => parent.user_id !== action.payload.parent.user_id
      );
    },

    hideParentErrorMsg: (state) => {
      state.isDialog = false;
    },
  },
});

export const parentActions = parentSlice.actions;

export default parentSlice;
