import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  all: [],
  loading: false,
};

const teacherSlice = createSlice({
  name: "teacher",
  initialState,
  reducers: {
    loadingRequest: (state) => {
      state.loading = true;
    },
    hideTeacherErrorMsg: (state) => {
      state.isDialog = false;
    },

    teacherCreateSuccess: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
      state.isDialog = action.payload.isDialog;
      state.msg = action.payload.msg;
      if (state.hasOwnProperty("all")) {
        state.all.push(action.payload.teacher);
      } else {
        state.all = [];
        state.all.push(action.payload.teacher);
      }
    },
    teacherCreateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload.response.data.error;
      state.isDialog = action.payload.response.data.isDialog;
      state.msg = action.payload.response.data.msg;
    },

    teacherLoadSuccess: (state, action) => {
      console.log(action.payload.teachers);
      state.loading = false;
      state.error = action.payload.error;
      state.all = action.payload.teachers;
    },
    teacherLoadFailure: (state, action) => {
      state.loading = false;
      state.msg = action.payload.response.data.msg;
      state.error = action.payload.response.data.error;
    },

    teacherUpdateSuccess: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
      state.isDialog = action.payload.isDialog;
      state.msg = action.payload.msg;
      state.all = state.all.map((teacher) =>
        teacher.user_id === action.payload.user.user_id
          ? action.payload.user
          : teacher
      );
    },
    teacherUpdateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload.response.data.error;
      state.isDialog = action.payload.response.data.isDialog;
      state.msg = action.payload.response.data.msg;
    },

    teacherRemoveSuccess: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
      state.isDialog = action.payload.isDialog;
      state.msg = action.payload.msg;
      state.all = state.all.filter(
        (student) => student.user_id !== action.payload.student.user_id
      );
    },
    teacherRemoveFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload.response.data.error;
      state.isDialog = action.payload.response.data.isDialog;
      state.msg = action.payload.response.data.msg;
    },

    loadCurrentTeacherSuccess: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
      state.current = action.payload.teacher;
    },
    loadCurrentTeacherFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload.response.data.error;
      state.msg = action.payload.response.data.msg;
    },

  },
});

export const teacherActions = teacherSlice.actions;

export default teacherSlice;
