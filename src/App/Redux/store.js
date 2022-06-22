import { configureStore } from "@reduxjs/toolkit";

// Reducers
import userSlice from "./Slice/userSlice";
import dashboardSlice from "./Slice/dashboardSlice";
import schoolSlice from "./Slice/schoolSlice";
import planSlice from "./Slice/planSlice";
import classSlice from "./Slice/classSlice";
import studentSlice from "./Slice/studentSlice";
import teacherSlice from "./Slice/teacherSlice";
import subjectSlice from "./Slice/subjectSlice";
import parentSlice from "./Slice/parentSlice";
import examSlice from "./Slice/examSlice";
import attendanceSlice from "./Slice/attendanceSlice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    dashboard: dashboardSlice.reducer,
    school: schoolSlice.reducer,
    plan: planSlice.reducer,
    class: classSlice.reducer,
    student: studentSlice.reducer,
    teacher: teacherSlice.reducer,
    subject: subjectSlice.reducer,
    parent: parentSlice.reducer,
    exam: examSlice.reducer,
    attendance: attendanceSlice.reducer,
  },
});

export default store;
