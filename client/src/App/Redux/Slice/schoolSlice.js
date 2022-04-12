import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  all: [],
  active: "",
  loading: false,
};

const schoolSlice = createSlice({
  name: "school",
  initialState,
  reducers: {
    loadingRequest: (state) => {
      state.loading = true;
    },
    hideErrorMsg: (state) => {
      state.isDialog = false;
    },

    schoolLoadSuccess: (state, action) => {
      state.loading = false;
      state.all = action.payload.school;
      state.error = action.payload.error;
    },
    schoolLoadFailure: (state, action) => {
      state.loading = false;
      state.msg = action.payload.response.data.msg;
      state.error = action.payload.response.data.error;
    },

    schoolCreateSuccess: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
      state.isDialog = action.payload.isDialog;
      state.msg = action.payload.msg;
      if (state.hasOwnProperty("all")) {
        state.all.push(action.payload.school);
      } else {
        state.all = [];
        state.all.push(action.payload.school);
      }
    },
    schoolCreateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload.response.data.error;
      state.isDialog = action.payload.response.data.isDialog;
      state.msg = action.payload.response.data.msg;
    },

    schoolRemoveSuccess: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
      state.isDialog = action.payload.isDialog;
      state.msg = action.payload.msg;
      state.all = state.all.filter((school) => school.school_id !== action.payload.school.school_id);
    },
    schoolRemoveFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload.response.data.error;
      state.isDialog = action.payload.response.data.isDialog;
      state.msg = action.payload.response.data.msg;
    },

    schoolUpdateSuccess: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
      state.isDialog = action.payload.isDialog;
      state.msg = action.payload.msg;
      state.all = state.all.map((school) => school.school_id === action.payload.school.school_id ? action.payload.school : school);
    },
    schoolUpdateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload.response.data.error;
      state.isDialog = action.payload.response.data.isDialog;
      state.msg = action.payload.response.data.msg;
    },

    schoolActiveSuccess: () => {
    },
    

  },
});

export const schoolActions = schoolSlice.actions;

export default schoolSlice;
