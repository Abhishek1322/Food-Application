import { createSlice } from "@reduxjs/toolkit";
import { restAllData } from "../commanAction";

const initialState = {
  isLoggedIn: false,
  loading: false,
  chefDocumentUrl: {},
  userInfo: [],
  userEmail: {},
  showSideBar: false,
  bankInfo: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => builder.addCase(restAllData, () => initialState),
  reducers: {
    updateBankDetails: (state) => {
      state.loading = true;
    },
    setUpdateBankDetails: (state) => {
      state.loading = false;
    },
    getBankDetails: (state) => {
      state.loading = false;
    },
    setGetBankDetails: (state, action) => {
      state.loading = false;
      state.bankInfo = action.payload;
    },
    addBankDetails: (state) => {
      state.loading = true;
    },
    setAddBankDetails: (state) => {
      state.loading = false;
    },
    getExpertise: (state) => {
      state.loading = false;
    },
    setGetExpertise: (state) => {
      state.loading = false;
    },
    toggleSidebar: (state, action) => {
      state.loading = false;
      state.showSideBar = action.payload;
    },
    chefProfileDocument: (state) => {
      state.loading = true;
    },
    setChefProfileDocument: (state, action) => {
      state.loading = false;
      state.chefDocumentUrl = action.payload;
    },
    chefSetupProfile: (state) => {
      state.loading = true;
    },
    setChefSetupProfile: (state) => {
      state.loading = false;
    },

    deleteAccount: (state) => {
      state.loading = true;
    },
    setDeleteAccount: (state) => {
      state.loading = false;
    },
    resendResetPasswordOtp: (state) => {
      state.loading = true;
    },
    setResendResetPasswordOtp: (state) => {
      state.loading = false;
    },
    resendVerifyOtp: (state) => {
      state.loading = true;
    },
    setResendVerifyOtp: (state) => {
      state.loading = false;
    },

    userLogout: (state) => {
      state.loading = true;
    },
    setUserLogout: (state) => {
      state.loading = false;
    },

    createNewPassword: (state) => {
      state.loading = true;
    },
    setCreateNewPassword: (state) => {
      state.loading = false;
    },

    resetPassword: (state) => {
      state.loading = true;
    },
    setResetPassword: (state) => {
      state.loading = false;
    },
    resetPasswordOtp: (state) => {
      state.loading = true;
    },
    setResetPasswordOtp: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
    },
    forgotPassword: (state) => {
      state.loading = true;
    },
    setForgotPassword: (state, action) => {
      state.loading = false;
      state.userEmail = action.payload;
    },
    verifyOtp: (state) => {
      state.loading = true;
    },
    setVerifyOtp: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
    },
    userSignUp: (state) => {
      state.loading = true;
    },
    setUserSignup: (state, action) => {
      state.loading = false;
      state.isLoggedIn = true;
      state.userInfo = action.payload;
    },
    userLogin: (state) => {
      state.loading = true;
    },
    setUserLogin: (state, action) => {
      state.loading = false;
      state.isLoggedIn = true;
      state.userInfo = action.payload;
    },
    onErrorStopLoad: (state) => {
      state.loading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  userSignUp,
  setUserSignup,
  onErrorStopLoad,
  userLogin,
  setUserLogin,
  verifyOtp,
  setVerifyOtp,
  forgotPassword,
  setForgotPassword,
  resetPasswordOtp,
  setResetPasswordOtp,
  resetPassword,
  setResetPassword,
  createNewPassword,
  setCreateNewPassword,
  userLogout,
  setUserLogout,
  resendVerifyOtp,
  setResendVerifyOtp,
  resendResetPasswordOtp,
  setResendResetPasswordOtp,
  deleteAccount,
  setDeleteAccount,
  chefSetupProfile,
  setChefSetupProfile,
  chefProfileDocument,
  setChefProfileDocument,
  toggleSidebar,
  getExpertise,
  setGetExpertise,
  addBankDetails,
  setAddBankDetails,
  getBankDetails,
  setGetBankDetails,
  updateBankDetails,
  setUpdateBankDetails,
} = authSlice.actions;

export default authSlice.reducer;
