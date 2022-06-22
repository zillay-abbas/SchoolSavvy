import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const planSlice = createSlice({
  name: "plan",
  initialState,
  reducers: {
    loadingRequest(state) {
      state.loading = true;
    },

    loadPlanSuccess(state, action) {
      state.loading = false;
      state.error = action.payload.error;
      state.isDialog = action.payload.isDialog;
      state.detail = Object.assign({}, action.payload.plan);
    },
    loadPlanFailure(state, action) {
      state.loading = false;
      state.error = action.payload.error;
      state.isDialog = action.payload.isDialog;
      state.msg = action.payload.msg;
    },

    updatePlanSuccess(state, action) {
      state.loading = false;
      state.error = action.payload.data.error;
      state.isDialog = action.payload.data.isDialog;
      state.msg = action.payload.data.msg;
      Object.assign(state.detail, action.payload.data.plan);
    },
    updatePlanFailure(state, action) {
      state.loading = false;
      state.error = true;
      state.isDialog = true;
      state.msg = action.payload.message;
    },
    updatePlanDataFailure(state, action) {
      state.loading = false;
      state.error = action.payload.error;
      state.isDialog = action.payload.isDialog;
      state.msg = action.payload.msg;
    },
     hideErrorMsg: (state) => {
      state.isDialog = false;
    },
  },
});

export const planActions = planSlice.actions;

export default planSlice;
