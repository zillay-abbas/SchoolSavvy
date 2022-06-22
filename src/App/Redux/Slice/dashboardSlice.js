import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    loadingRequest: (state) => {
      state.loading = true;
    },

    onFailure: (state, action) => {
      state.loading = false;
      state.school = action.payload.activeSchool;
      state.isDialog = action.payload.isDialog;
      state.error = action.payload.error;
      state.msg = action.payload.msg;
    },

    hideErrorMsg: (state) => {
      state.isDialog = false;
    },
    
    noticeCreateSuccess: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
      state.isDialog = action.payload.isDialog;
      state.msg = action.payload.msg;
      state.notice.push(action.payload.notice);
    },

    noticeUpdateSuccess: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
      state.isDialog = action.payload.isDialog;
      state.msg = action.payload.msg;
      state.notice = state.notice.map((item) =>
        item.id === action.payload.notice.id
          ? action.payload.notice
          : item
      );
    },

    noticeLoadSuccess: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
      state.isDialog = action.payload.isDialog;
      state.msg = action.payload.msg;
      state.notice = action.payload.notice;
    },

    dashboardSuccess: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
      state.school = action.payload.school;
      state.students = action.payload.student;
      state.parents = action.payload.parent;
      state.teachers = action.payload.teacher;
      state.subjects = action.payload.subject;
      state.presentStudents = action.payload.presentStudent;
      state.absentStudents = action.payload.absentStudent;
    },

    activeDashboardSchoolSuccess: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
      state.isDialog = action.payload.isDialog;
      Object.assign(state.school, action.payload.activeSchool);
    },
  },
});

export const dashboardActions = dashboardSlice.actions;

export default dashboardSlice;
