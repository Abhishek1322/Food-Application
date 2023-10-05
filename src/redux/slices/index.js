import { combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "./auth";
import { webSlice } from "./web";

export const mainReducer = combineReducers({
    auth: authSlice.reducer,
    web: webSlice.reducer
})