import { configureStore } from "@reduxjs/toolkit";

// Reducers
<<<<<<< HEAD
import { userReducer } from "./reducers/UserReducer";

const store = configureStore({
  reducer: {
    adminUser:userReducer,
=======
import userSlice from "./Slice/userSlice";
import dashboardSlice from "./Slice/dashboardSlice";
import schoolSlice from "./Slice/schoolSlice";
import planSlice from "./Slice/planSlice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    dashboard: dashboardSlice.reducer,
    school: schoolSlice.reducer,
    plan: planSlice.reducer,
>>>>>>> 3912ef269a04caeeb2979e8d5f6b3906b0247a3c
  },
});

export default store;
