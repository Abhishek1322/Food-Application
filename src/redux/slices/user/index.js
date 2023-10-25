import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  address: [],
  userAddres: [],
  helperPagesData: [],
  cartData: [],
  cartCount: [],
  allOrders: [],
};

export const userSilce = createSlice({
  name: "user",
  initialState,
  reducers: {
    getAllOrder: (state) => {
      state.loading = true;
    },
    setGetAllOrder: (state, action) => {
      state.loading = false;
      state.allOrders = action.payload;
    },

    cancelOrder: (state) => {
      state.loading = true;
    },
    setCancelOrder: (state, action) => {
      state.loading = false;
    },
    createOrder: (state) => {
      state.loading = true;
    },
    setCreateOrder: (state, action) => {
      state.loading = false;
    },

    deleteCartItem: (state) => {
      state.loading = true;
    },
    setDeleteCartItem: (state, action) => {
      state.loading = false;
      state.cartData = action.payload;
    },
    getAllCart: (state) => {
      state.loading = true;
    },
    setGetAllCart: (state, action) => {
      state.loading = false;
      state.cartData = action.payload;
      state.cartCount = action.payload;
    },
    addToCart: (state) => {
      state.loading = true;
    },
    setAddToCart: (state) => {
      state.loading = false;
    },
    getHelperPages: (state) => {
      state.loading = true;
    },
    setGetHelperPages: (state, action) => {
      state.loading = false;
      state.helperPagesData = action.payload;
    },
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
  setGetHelperPages,
  getHelperPages,
  addToCart,
  setAddToCart,
  getAllCart,
  setGetAllCart,
  deleteCartItem,
  setDeleteCartItem,
  createOrder,
  setCreateOrder,
  cancelOrder,
  setCancelOrder,
  getAllOrder,
  setGetAllOrder,
} = userSilce.actions;

export default userSilce.reducer;
