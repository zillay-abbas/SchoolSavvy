import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  all: [],
};

const classSlice = createSlice({
  name: "class",
  initialState,
  reducers: {
    loadingRequest(state) {
      state.loading = true;
    },

    classCreateSuccess: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
      state.isDialog = action.payload.isDialog;
      state.msg = action.payload.msg;
      console.log(action.payload);
      if (state.hasOwnProperty("all")) {
        state.all.push(action.payload.class);
      } else {
        state.all = [];
        state.all.push(action.payload.class);
      }
    },
    classCreateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload.response.data.error;
      state.isDialog = action.payload.response.data.isDialog;
      state.msg = action.payload.response.data.msg;
    },

    createScheduleSuccess: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
      state.isDialog = action.payload.isDialog;
      state.msg = action.payload.msg;
      if (state.hasOwnProperty("routine")) {
        state.routine.push(action.payload.schedule);
      } else {
        state.routine = [];
        state.routine.push(action.payload.schedule);
      }
    },
    createScheduleFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload.response.data.error;
      state.isDialog = action.payload.response.data.isDialog;
      state.msg = action.payload.response.data.msg;
    },

    classUpdateSuccess: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
      state.isDialog = action.payload.isDialog;
      state.msg = action.payload.msg;
      state.all = state.all.map((grade) =>
        grade.class_id === action.payload.class.class_id
          ? action.payload.class
          : grade
      );
    },
    classUpdateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload.response.data.error;
      state.isDialog = action.payload.response.data.isDialog;
      state.msg = action.payload.response.data.msg;
    },

    classRemoveSuccess: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
      state.isDialog = action.payload.isDialog;
      state.msg = action.payload.msg;
      state.all = state.all.filter(
        (grade) => grade.class_id !== action.payload.class.class_id
      );
    },
    classRemoveFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload.response.data.error;
      state.isDialog = action.payload.response.data.isDialog;
      state.msg = action.payload.response.data.msg;
    },

    sectionRemoveSuccess: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
      state.isDialog = action.payload.isDialog;
      state.msg = action.payload.msg;
      state.all = state.all.map((grade) =>
        grade.class_id === action.payload.class.class_id
          ? action.payload.class
          : grade
      );
    },
    sectionRemoveFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload.response.data.error;
      state.isDialog = action.payload.response.data.isDialog;
      state.msg = action.payload.response.data.msg;
    },

    sectionCreateSuccess: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
      state.isDialog = action.payload.isDialog;
      state.msg = action.payload.msg;
      state.all = state.all.map((grade) =>
        grade.class_id === action.payload.class.class_id
          ? action.payload.class
          : grade
      );
    },
    sectionCreateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload.response.data.error;
      state.isDialog = action.payload.response.data.isDialog;
      state.msg = action.payload.response.data.msg;
    },

    loadClassSuccess(state, action) {
      state.loading = false;
      state.error = action.payload.error;
      state.isDialog = action.payload.isDialog;
      state.all = action.payload.classes;
    },
    loadClassFailure(state, action) {
      state.loading = false;
      state.error = action.payload.error;
      state.isDialog = action.payload.isDialog;
      state.msg = action.payload.msg;
    },

    loadClassRoutineSuccess(state, action) {
      state.loading = false;
      state.error = action.payload.error;
      state.isDialog = action.payload.isDialog;
      state.routine = action.payload.routine;
    },
    loadClassRoutineFailure(state, action) {
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

export const classActions = classSlice.actions;

export default classSlice;
