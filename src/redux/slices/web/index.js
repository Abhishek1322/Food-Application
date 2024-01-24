import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  chefProfileDetails: [],
  userProfileDetails: [],
  chefListData: [],
  menusList: [],
  imageUrl: [],
  getSingleMenu: [],
  getSingleChef: [],
  profileInfo: [],
  userProfileData: [],
};

export const webSlice = createSlice({
  name: "web",
  initialState,
  reducers: {
    userProfileDataGet: (state) => {
      state.loading = true;
    },
    setUserProfileDataGet: (state, action) => {
      state.loading = false;
      state.userProfileData = action.payload;
    },
    getSlotDay: (state) => {
      state.loading = true;
    },
    setGetSlotDay: (state) => {
      state.loading = false;
    },
    getSingleChef: (state) => {
      state.loading = true;
    },
    setGetSingleChef: (state, action) => {
      state.loading = false;
      state.getSingleChef = action.payload;
    },
    deleteMenuItem: (state) => {
      state.loading = true;
    },
    setDeleteMenuItem: (state, action) => {
      state.loading = false;
    },
    singleMenu: (state) => {
      state.loading = true;
    },
    setSingleMenu: (state, action) => {
      state.loading = false;
      state.getSingleMenu = action.payload;
    },
    editMenuItem: (state) => {
      state.loading = true;
    },
    seteditMenuItem: (state, action) => {
      state.loading = false;
    },
    createImageUrl: (state) => {
      state.loading = true;
    },
    setCreateImageUrl: (state, action) => {
      state.loading = false;
      state.imageUrl = action.payload;
    },
    createMenu: (state) => {
      state.loading = true;
    },
    setCreateMenu: (state, action) => {
      state.loading = false;
      state.menusList = action.payload;
    },
    getMenusLists: (state) => {
      state.loading = true;
    },
    setGetMenusLists: (state, action) => {
      state.loading = false;
      state.menusList = action.payload;
    },
    chefLists: (state) => {
      state.loading = true;
    },
    setChefLists: (state, action) => {
      state.loading = false;
      state.chefListData = action.payload;
    },
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
    setUpdateChefProfile: (state) => {
      state.loading = false;
    },
    updateProfileImage: (state) => {
      state.loading = true;
    },
    setUpdateProfileImage: (state, action) => {
      state.loading = false;
      state.profileInfo = action.payload;
    },
    getUserProfileDetails: (state) => {
      state.loading = true;
    },
    setUserProfileDetails: (state, action) => {
      state.loading = false;
      state.userProfileDetails = action.payload;
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
  setUpdateProfileImage,
  getUserProfileDetails,
  setUserProfileDetails,
  chefLists,
  setChefLists,
  getMenusLists,
  setGetMenusLists,
  createMenu,
  setCreateMenu,
  createImageUrl,
  setCreateImageUrl,
  editMenuItem,
  seteditMenuItem,
  singleMenu,
  setSingleMenu,
  deleteMenuItem,
  setDeleteMenuItem,
  getSingleChef,
  setGetSingleChef,
  getSlotDay,
  setGetSlotDay,
  userProfileDataGet,
  setUserProfileDataGet
} = webSlice.actions;

export default webSlice.reducer;
