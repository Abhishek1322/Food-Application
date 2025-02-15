import { createSlice } from "@reduxjs/toolkit";
import { restAllData } from "../commanAction";

const initialState = {
  loading: false,
  allRecentOrder: [],
  success: false,
  allBookingRequests: [],
};

export const chefSilce = createSlice({
  name: "chef",
  initialState,
  extraReducers: (builder) => builder.addCase(restAllData, () => initialState),
  reducers: {
    confirmBookingResendOtp: (state) => {
      state.loading = true;
    },
    setConfirmBookingResendOtp: (state) => {
      state.loading = false;
    },
    confirmBookingOtp: (state) => {
      state.loading = true;
    },
    setConfirmBookingOtp: (state) => {
      state.loading = false;
    },
    acceptBooking: (state) => {
      state.loading = true;
    },
    setAcceptBooking: (state, action) => {
      state.loading = false;
    },
    getBookingDetail: (state) => {
      state.loading = true;
    },
    setGetBookingDetail: (state, action) => {
      state.loading = false;
    },
    getBookingRequests: (state) => {
      state.loading = true;
    },
    setGetBookingRequests: (state, action) => {
      state.loading = false;
      state.allBookingRequests = action.payload;
    },
    confirmResendOtp: (state) => {
      state.loading = true;
    },
    setConfirmResendOtp: (state, action) => {
      state.loading = false;
    },
    confirmOrderOtp: (state) => {
      state.loading = true;
    },
    setConfirmOrderOtp: (state, action) => {
      state.loading = false;
    },
    getSingleOrderDetail: (state) => {
      state.loading = true;
    },
    setGetSingleOrderDetail: (state, action) => {
      state.loading = false;
    },
    acceptOrder: (state) => {
      state.loading = true;
      state.success = false;
    },
    setAcceptOrder: (state, action) => {
      state.loading = false;
      state.success = true;
    },
    getRecentOrder: (state, action) => {
      state.loading = true;
    },
    setGetRecentOrder: (state, action) => {
      state.loading = false;
      state.allRecentOrder = action.payload;
    },
    onErrorStopLoadChef: (state) => {
      state.loading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  getRecentOrder,
  setGetRecentOrder,
  acceptOrder,
  setAcceptOrder,
  onErrorStopLoadChef,
  getSingleOrderDetail,
  setGetSingleOrderDetail,
  confirmOrderOtp,
  setConfirmOrderOtp,
  confirmResendOtp,
  setConfirmResendOtp,
  getBookingRequests,
  setGetBookingRequests,
  getBookingDetail,
  setGetBookingDetail,
  acceptBooking,
  setAcceptBooking,
  confirmBookingOtp,
  setConfirmBookingOtp,
  confirmBookingResendOtp,
  setConfirmBookingResendOtp,
} = chefSilce.actions;

export default chefSilce.reducer;
