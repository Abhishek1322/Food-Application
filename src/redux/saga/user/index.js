import { all, call, put, takeLatest } from "redux-saga/effects";
import { ApiClient } from "../../../utilities/api";
import ApiPath from "../../../constants/apiPath";
import { toast } from "react-toastify";
import {
  setAddAddress,
  setGetUserAddress,
  onErrorStopLoad,
} from "../../slices/user";

// Worker saga will be fired on USER_FETCH_REQUESTED actions

function* getUserAddress(action) {
  try {
    const resp = yield call(
      ApiClient.get,
      (action.url = ApiPath.userApiPath.GET_ADDRESS),
      (action.payload = action.payload)
    );
    if (resp.status) {
      yield put(setGetUserAddress(resp.data.data));
      yield call(action.payload.cb, resp);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.dismiss();
    toast.error(e.response.data.message);
  }
}

function* addAddress(action) {
  try {
    const resp = yield call(
      ApiClient.post,
      (action.url = ApiPath.userApiPath.ADD_ADDRESS),
      (action.payload = action.payload)
    );
    if (resp.status) {
      yield put(setAddAddress(resp.data.data));
      yield call(action.payload.cb, resp);
      toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.dismiss();
    if (e.response.data.data[0]) {
      toast.error(e.response.data.data[0]);
    } else {
      toast.error(e.response.data.message);
    }
  }
}

function* userSaga() {
  yield all([takeLatest("user/addAddress", addAddress)]);
  yield all([takeLatest("user/getUserAddress", getUserAddress)]);
}

export default userSaga;
