import { all, call, put, takeLatest } from "redux-saga/effects";
import { ApiClient } from "../../../utilities/api";
import {
  onErrorStopLoad,
  setUserSignup,
  setUserLogin,
  setVerifyOtp,
  setForgotPassword,
  setResetPasswordOtp,
  setResetPassword,
  setCreateNewPassword,
  setUserLogout,
  setResendVerifyOtp,
  setResendResetPasswordOtp,
  setDeleteAccount,
} from "../../slices/auth";
import ApiPath from "../../../constants/apiPath";
import { toast } from "react-toastify";

// Worker saga will be fired on USER_FETCH_REQUESTED actions

function* deleteAccount(action) {
  try {
    const resp = yield call(
      ApiClient.delete,
      (action.url = `${ApiPath.AuthApiPath.DELETE_ACCOUNT}${action.payload.id}`),
      (action.payload = action.payload)
    );
    if (resp.status) {
      localStorage.removeItem("userEmail");
      localStorage.removeItem("authToken");
      localStorage.removeItem("persist:root");
      yield put(setDeleteAccount(resp.data.payload));
      yield call(action.payload.cb, resp);
      toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.dismiss();
    toast.error(e.response.data.message);
  }
}

function* resendResetPasswordOtp(action) {
  try {
    const resp = yield call(
      ApiClient.post,
      (action.url = ApiPath.AuthApiPath.RESEND_OTP),
      (action.payload = action.payload)
    );
    if (resp.status) {
      yield put(setResendResetPasswordOtp(resp.data.payload));
      yield call(action.payload.cb, resp);
      toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.dismiss();
    toast.error(e.response.data.message);
  }
}

function* resendVerifyOtp(action) {
  try {
    const resp = yield call(
      ApiClient.post,
      (action.url = ApiPath.AuthApiPath.RESEND_OTP),
      (action.payload = action.payload)
    );
    if (resp.status) {
      yield put(setResendVerifyOtp(resp.data.payload));
      yield call(action.payload.cb, resp);
      toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.dismiss();
    toast.error(e.response.data.message);
  }
}
function* createNewPassword(action) {
  try {
    const resp = yield call(
      ApiClient.post,
      (action.url = ApiPath.AuthApiPath.CREATE_NEW_PASSWORD),
      (action.payload = action.payload)
    );
    if (resp.status) {
      yield put(setCreateNewPassword(resp.data.payload));
      yield call(action.payload.cb, resp);
      toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.dismiss();
    toast.error(e.response.data.message);
  }
}

function* resetPassword(action) {
  try {
    const resp = yield call(
      ApiClient.post,
      (action.url = ApiPath.AuthApiPath.RESET_PASSWORD),
      (action.payload = action.payload)
    );
    if (resp.status) {
      yield put(setResetPassword(resp.data.payload));
      yield call(action.payload.cb, resp);
      toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.dismiss();
    toast.error(e.response.data.message);
  }
}

function* resetPasswordOtp(action) {
  try {
    const resp = yield call(
      ApiClient.post,
      (action.url = ApiPath.AuthApiPath.RESET_PASSWORD_OTP),
      (action.payload = action.payload)
    );
    if (resp.status) {
      yield put(setResetPasswordOtp(resp.data.payload));
      yield call(action.payload.cb, resp);
      toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.dismiss();
    toast.error(e.response.data.message);
  }
}

function* forgotPassword(action) {
  try {
    const resp = yield call(
      ApiClient.post,
      (action.url = ApiPath.AuthApiPath.FORGOT_PASSWORD),
      (action.payload = action.payload)
    );
    if (resp.status) {
      yield put(setForgotPassword(resp.data.payload));
      // localStorage.setItem(
      //   "userEmail",
      //   resp.data.data.email ? resp.data.data.email : ""
      // );
      yield call(action.payload.cb, resp);
      toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.dismiss();
    toast.error(e.response.data.message);
  }
}

function* verifyOtp(action) {
  try {
    const resp = yield call(
      ApiClient.post,
      (action.url = ApiPath.AuthApiPath.VERIFY_OTP),
      (action.payload = action.payload)
    );
    if (resp.status) {
      yield put(setVerifyOtp(resp.data.payload));
      yield call(action.payload.cb, resp);
      toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.dismiss();
    toast.error(e.response.data.message);
  }
}

function* userSignUp(action) {
  try {
    const resp = yield call(
      ApiClient.post,
      (action.url = ApiPath.AuthApiPath.USER_SIGNUP),
      (action.payload = action.payload)
    );
    if (resp.status) {
      localStorage.setItem(
        "userEmail",
        resp.data.data.email ? resp.data.data.email : ""
      );
      localStorage.setItem(
        "userId",
        resp.data.data.id ? resp.data.data.id : ""
      );
      localStorage.setItem(
        "authToken",
        resp.data && resp.data.data.token ? resp.data.data.token : ""
      );
      yield put(setUserSignup(resp.data.payload));
      yield call(action.payload.cb, resp);
      toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    console.log("erororrororro", e);
    yield put(onErrorStopLoad());
    toast.dismiss();
    toast.error(e.response.data.message);
  }
}

function* userLogin(action) {
  try {
    const resp = yield call(
      ApiClient.post,
      (action.url = ApiPath.AuthApiPath.LOGIN_USER),
      (action.payload = action.payload)
    );
    if (resp.status) {
      console.log("respectdsacdsc", resp);
      localStorage.setItem(
        "authToken",
        resp.data && resp.data.data.token ? resp.data.data.token : ""
      );

      yield put(setUserLogin(resp.data.payload));
      yield call(action.payload.cb, (action.res = resp));
      toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    console.log("logerorrddddo", e);
    yield put(setUserLogin({}));
    yield put(onErrorStopLoad());
    toast.error(e.response.data.message);
  }
}

function* userLogout(action) {
  try {
    const resp = yield call(
      ApiClient.get,
      (action.url = ApiPath.AuthApiPath.LOGOUT_USER),
      (action.payload = action.payload)
    );
    if (resp.status) {
      yield call(action.payload.cb, (action.res = resp));
      localStorage.removeItem("authToken");
      localStorage.removeItem("persist:root");
      toast.success(resp.data.message);
      yield put(setUserLogout());
    } else {
      throw resp;
    }
  } catch (e) {
    toast.error(e.response.data.message);
  }
}

function* authSaga() {
  yield all([
    takeLatest("auth/userSignUp", userSignUp),
    takeLatest("auth/userLogin", userLogin),
    takeLatest("auth/verifyOtp", verifyOtp),
    takeLatest("auth/forgotPassword", forgotPassword),
    takeLatest("auth/resetPasswordOtp", resetPasswordOtp),
    takeLatest("auth/resetPassword", resetPassword),
    takeLatest("auth/createNewPassword", createNewPassword),
    takeLatest("auth/userLogout", userLogout),
    takeLatest("auth/resendVerifyOtp", resendVerifyOtp),
    takeLatest("auth/resendResetPasswordOtp", resendResetPasswordOtp),
    takeLatest("auth/deleteAccount", deleteAccount),
  ]);
}

export default authSaga;
