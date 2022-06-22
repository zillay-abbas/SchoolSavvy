import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  all: [],
};

const examSlice = createSlice({
  name: "exam",
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

    examCreateSuccess: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
      state.isDialog = action.payload.isDialog;
      state.msg = action.payload.msg;
      if (state.hasOwnProperty("all")) {
        state.all.push(action.payload.exam);
      } else {
        state.all = [];
        state.all.push(action.payload.exam);
      }
    },

    createExamScheduleSuccess: (state, action) => {  
      state.loading = false;
      state.error = action.payload.error;
      state.isDialog = action.payload.isDialog;
      state.msg = action.payload.msg;
      state.all = state.all.map((exam) =>
        exam.exam_id === action.payload.exam.exam_id
          ? action.payload.exam
          : exam
      );
    },

    updateExamScheduleSuccess: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
      state.isDialog = action.payload.isDialog;
      state.msg = action.payload.msg;
      state.all = state.all.map((schdule) =>
        schdule.exam_id === action.payload.schedule.exam_id
          ? action.payload.schedule
          : schdule
      );
    },

    examUpdateSuccess: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
      state.isDialog = action.payload.isDialog;
      state.msg = action.payload.msg;
      state.all = state.all.map((exam) =>
        exam.exam_id === action.payload.exam.exam_id
          ? action.payload.exam
          : exam
      );
    },

    examRemoveSuccess: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
      state.isDialog = action.payload.isDialog;
      state.msg = action.payload.msg;
      state.all = state.all.filter(
        (exam) => exam.exam_id !== action.payload.exam.exam_id
      );
    },

    examUpdateTotalMarksSuccess: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
      state.isDialog = action.payload.isDialog;
      state.msg = action.payload.msg;
      state.all = state.all.map((exam) =>
        exam.id === action.payload.exam.id
          ? action.payload.exam
          : exam
      );
    },

    uploadSolutionSuccess: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
      state.isDialog = action.payload.isDialog;
      state.msg = action.payload.msg;
      state.all = state.all.map((exam) =>
        exam.id === action.payload.exam.id
          ? action.payload.exam
          : exam
      );
    },

    loadExamSuccess(state, action) {
      state.loading = false;
      state.error = action.payload.error;
      state.isDialog = action.payload.isDialog;
      state.all = action.payload.exams;
    },

    hideErrorMsg: (state) => {
      state.isDialog = false;
    },
  },
});

export const examActions = examSlice.actions;

export default examSlice;
