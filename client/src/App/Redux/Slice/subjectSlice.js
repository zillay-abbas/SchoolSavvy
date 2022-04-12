import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  all: [],
  loading: false,
};

const subjectSlice = createSlice({
  name: "subject",
  initialState,
  reducers: {
    loadingRequest: (state) => {
      state.loading = true;
    },
    hideSubjectErrorMsg: (state) => {
      state.isDialog = false;
    },

    subjectCreateSuccess: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
      state.isDialog = action.payload.isDialog;
      state.msg = action.payload.msg;
      if (state.hasOwnProperty("all")) {
        state.all.push(action.payload.subject);
      } else {
        state.all = [];
        state.all.push(action.payload.subject);
      }
    },
    subjectCreateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload.response.data.error;
      state.isDialog = action.payload.response.data.isDialog;
      state.msg = action.payload.response.data.msg;
    },

    subjectUpdateSuccess: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
      state.isDialog = action.payload.isDialog;
      state.msg = action.payload.msg;
      state.all = state.all.map((subject) =>
        subject.course_id === action.payload.subject.course_id
          ? action.payload.subject
          : subject
      );
    },
    subjectUpdateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload.response.data.error;
      state.isDialog = action.payload.response.data.isDialog;
      state.msg = action.payload.response.data.msg;
    },

    subjectRemoveSuccess: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
      state.isDialog = action.payload.isDialog;
      state.msg = action.payload.msg;
      state.all = state.all.filter(
        (subject) => subject.course_id !== action.payload.subject.course_id
      );
    },
    subjectRemoveFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload.response.data.error;
      state.isDialog = action.payload.response.data.isDialog;
      state.msg = action.payload.response.data.msg;
    },

    subjectLoadSuccess: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
      state.isDialog = action.payload.isDialog;
      state.all = action.payload.subjects;
    },
    subjectLoadFailure: (state, action) => {
      state.loading = false;
      state.msg = action.payload.response.data.msg;
      state.error = action.payload.response.data.error;
      state.isDialog =  action.payload.response.data.isDialog;
    },
  },
});

export const subjectActions = subjectSlice.actions;

export default subjectSlice;
