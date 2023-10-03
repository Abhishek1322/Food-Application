import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  chefProfileDetails: [],
};

export const authSlice = createSlice({
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

    onErrorStopLoad: (state) => {
      state.loading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getChefProfileDetails, setChefProfileDetails,onErrorStopLoad } =
  authSlice.actions;

export default authSlice.reducer;
