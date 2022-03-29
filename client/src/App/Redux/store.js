import { configureStore } from "@reduxjs/toolkit";

// Reducers
import { userReducer } from "./reducers/UserReducer";

const store = configureStore({
  reducer: {
    adminUser:userReducer,
  },
});

export default store;
