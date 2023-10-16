import { combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "./auth";
import { webSlice } from "./web";
import { userSilce } from "./user";

export const mainReducer = combineReducers({
  auth: authSlice.reducer,
  web: webSlice.reducer,
  user: userSilce.reducer,
});
