const ApiPath = {
  AuthApiPath: {
    USER_SIGNUP: "/users",
    LOGIN_USER: "/users/login",
    VERIFY_OTP: "/users/verify",
    FORGOT_PASSWORD: "/users/forgot-password",
    RESET_PASSWORD_OTP: "/users/reset-password-otp-verify",
    RESET_PASSWORD: "/users/reset-password",
    CREATE_NEW_PASSWORD: "/users/change-password",
    LOGOUT_USER: "/users/logOut",
    RESEND_OTP: "/users/resend",
    DELETE_ACCOUNT: "/users/",
    CHEF_SETUP_PROFILE: "/users/add-chef-detail",
    CHEF_SETUP_PROFILE_DOCUMENT: "/users/upload-file",
    CHEF_PROFILE_DETAILS: "/users",
    UPDATE_CHEF_PROFILE: "/users",
  },
  webApiPath: {
    CHEF_LIST: "/users/chefs",
    MENUS: "/menus",
    GET_FILES_URL: "/menus/upload-image",
    EDIT_MENU_ITEM: "/menus",
    SINGLE_CHEF_DETAIL:"/users/chefDetail"
  },
  userApiPath:{
     ADD_ADDRESS:"/user_delivery_address"
  }
};

export default ApiPath;
