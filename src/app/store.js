import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import userReducer from "../features/user/userSlice";
import screamsReducer from "../features/screams/screamsSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    screams: screamsReducer,
  },
});
