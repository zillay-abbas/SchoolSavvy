import { configureStore } from "@reduxjs/toolkit";

// Reducers
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
  },
});

export default store;
