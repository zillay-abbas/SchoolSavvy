import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  all: [],
};

const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {
    loadingRequest(state) {
      state.loading = true;
    },

    onFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload.response.data.error;
      state.isDialog = action.payload.response.data.isDialog;
      state.msg = action.payload.response.data.msg;
    },

    hideErrorMsg: (state) => {
      state.isDialog = false;
    },

    attendanceSubmitted: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
      state.isDialog = action.payload.isDialog;
      state.msg = action.payload.msg;
      state.today = action.payload.today;
      if (action.payload.marked) {
        state.all.push(action.payload?.marked);
      }
    },

    loadAttendanceSuccess: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
      state.isDialog = action.payload.isDialog;
      state.msg = action.payload.msg;
      state.today = action.payload.today;
      state.all = action.payload.marked;
    },

    
    updateSuccess: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
      state.isDialog = action.payload.isDialog;
      state.msg = action.payload.msg;
      state.all = state.all.map((record) =>
        record.id === action.payload.marked.id
          ? action.payload.marked
          : record
      );
    },
  },
});

export const attendanceActions = attendanceSlice.actions;

export default attendanceSlice;
