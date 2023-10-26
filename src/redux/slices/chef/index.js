import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  allRecentOrder: [],
};

export const chefSilce = createSlice({
  name: "chef",
  initialState,
  reducers: {
    getSingleOrderDetail: (state) => {
      state.loading = true;
    },
    setGetSingleOrderDetail: (state, action) => {
      state.loading = false;
    },

    acceptOrder: (state) => {
      state.loading = true;
    },
    setAcceptOrder: (state, action) => {
      state.loading = false;
    },
    getRecentOrder: (state) => {
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
} = chefSilce.actions;

export default chefSilce.reducer;
