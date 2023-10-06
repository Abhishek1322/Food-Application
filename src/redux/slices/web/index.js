import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  chefProfileDetails: [],
};

export const webSlice = createSlice({
  name: "web",
  initialState,
  reducers: {
    getChefProfileDetails: (state) => {
      state.loading = true;
    },

    setChefProfileDetails: (state, action) => {
      state.loading = false;
      state.chefProfileDetails = action.payload;
    },
    updateChefProfile: (state) => {
      state.loading = true;
    },
    setUpdateChefProfile: (state, action) => {
      state.loading = false;
    },
    updateProfileImage: (state) => {
      state.loading = true;
    },
    setUpdateProfileImage: (state, action) => {
      state.loading = false;
    },
    onErrorStopLoad: (state) => {
      state.loading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  getChefProfileDetails,
  setChefProfileDetails,
  updateChefProfile,
  setUpdateChefProfile,
  onErrorStopLoad,
  updateProfileImage,
  setUpdateProfileImage
} = webSlice.actions;

export default webSlice.reducer;
