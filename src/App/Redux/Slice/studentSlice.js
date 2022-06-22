import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  all: [],
  loading: false,
  searchedStudent: [],
};

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    loadingRequest: (state) => {
      state.loading = true;
    },
    hideStudentErrorMsg: (state) => {
      state.isDialog = false;
    },

    studentCreateSuccess: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
      state.isDialog = action.payload.isDialog;
      state.msg = action.payload.msg;
      if (state.hasOwnProperty("all")) {
        state.all.push(action.payload.user[0]);
      } else {
        state.all = [];
        state.all.push(action.payload.user[0]);
      }
    },
    studentCreateFailure: (state, action) => {
      state.loading = false;
      console.log(action.payload);
      state.error = action.payload.response.data.error;
      state.isDialog = action.payload.response.data.isDialog;
      state.msg = action.payload.response.data.msg;
    },

    studentLoadSuccess: (state, action) => {
      state.loading = false;
      state.all = action.payload.students;
      state.error = action.payload.error;
    },
    studentlLoadFailure: (state, action) => {
      state.loading = false;
      state.msg = action.payload.response.data.msg;
      state.isDialog = action.payload.response.data.isDialog;
      state.error = action.payload.response.data.error;
    },

    loadCurrentStudentSuccess: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
      state.current = action.payload.student;
    },
    loadCurrentStudentFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload.response.data.error;
      state.msg = action.payload.response.data.msg;
    },

    studentRemoveSuccess: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
      state.isDialog = action.payload.isDialog;
      state.msg = action.payload.msg;
      state.all = state.all.filter(
        (student) => student.user_id !== action.payload.student.user_id
      );
    },
    studentRemoveFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload.response.data.error;
      state.isDialog = action.payload.response.data.isDialog;
      state.msg = action.payload.response.data.msg;
    },

    studentUpdateSuccess: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
      state.isDialog = action.payload.isDialog;
      state.msg = action.payload.msg;
      state.all = state.all.map((student) =>
        student.user_id === action.payload.user.user_id
          ? action.payload.user
          : student
      );
    },
    studentUpdateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload.response.data.error;
      state.isDialog = action.payload.response.data.isDialog;
      state.msg = action.payload.response.data.msg;
    },

    searchStudentFromState: (state, action) => {
      state.isSearch = true;
      console.log(action.payload);
      state.searchedStudent = state.all.filter(
        (student) => student?.school_student?.student_reg_no === action.payload
      );
    },
    stopSearching: (state, action) => {
      state.isSearch = false;
    }
  },
});

export const studentActions = studentSlice.actions;

export default studentSlice;
