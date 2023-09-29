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
    CHEF_PROFILE_DETAILS:"/users"
  },
};

export default ApiPath;
