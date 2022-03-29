import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    loadingRequest: (state) => {
      state.loading = true;
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
    dashboardFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload.response.data.error;
      state.msg = action.payload.response.data.msg;
    },

    activeDashboardSchoolSuccess: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
      state.isDialog = action.payload.isDialog;
      Object.assign(state.school, action.payload.activeSchool);
    },
    activeDashboardSchoolFailure: (state, action) => {
      state.loading = false;
      state.school = action.payload.activeSchool;
      state.isDialog = action.payload.isDialog;
      state.error = action.payload.error;
      state.msg = action.payload.msg;
    },
  },
});

export const dashboardActions = dashboardSlice.actions;

export default dashboardSlice;
