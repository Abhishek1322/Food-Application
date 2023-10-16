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
    addContactUsDetail: (state) => {
      state.loading = true;
    },
    setAddContactUsDetail: (state, action) => {
      state.loading = false;
    },
    deleteAddress: (state) => {
      state.loading = true;
    },
    setDeleteAddress: (state, action) => {
      state.loading = false;
    },
    singleAddress: (state) => {
      state.loading = true;
    },
    setSingleAddress: (state, action) => {
      state.loading = false;
    },
    editUserAddress: (state) => {
      state.loading = true;
    },
    setEditUserAddress: (state, action) => {
      state.loading = false;
    },
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
  editUserAddress,
  setEditUserAddress,
  singleAddress,
  setSingleAddress,
  deleteAddress,
  setDeleteAddress,
  addContactUsDetail,
  setAddContactUsDetail,
} = userSilce.actions;

export default userSilce.reducer;
