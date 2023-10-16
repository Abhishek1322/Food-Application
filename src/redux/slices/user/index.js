import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  address: [],
  userAddres: [],
};

export const userSilce = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUserAddress: (state) => {
      state.loading = true;
    },
    setGetUserAddress: (state, action) => {
      state.loading = false;
      state.userAddres = action.payload;
    },
    addAddress: (state) => {
      state.loading = true;
    },
    setAddAddress: (state, action) => {
      state.loading = false;
      state.address = action.payload;
    },
    onErrorStopLoad: (state) => {
      state.loading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addAddress,
  setAddAddress,
  getUserAddress,
  setGetUserAddress,
  onErrorStopLoad,
} = userSilce.actions;

export default userSilce.reducer;
