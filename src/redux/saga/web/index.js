import { all, call, put, takeLatest } from "redux-saga/effects";
import { ApiClient } from "../../../utilities/api";
import ApiPath from "../../../constants/apiPath";
import { toast } from "react-toastify";
import {
  setChefProfileDetails,
  setUpdateChefProfile,
  onErrorStopLoad,
  setUpdateProfileImage,
  setUserProfileDetails,
  setChefLists,
} from "../../slices/web";

function* chefLists(action) {
  try {
    const resp = yield call(
      ApiClient.get,
      (action.url = `${ApiPath.webApiPath.CHEF_LIST}?page=${action.payload.page}&limit=${action.payload.limit}`),
      (action.payload = action.payload)
    );
    if (resp.status) {
      yield call(action.payload.cb, (action.res = resp));
      yield put(setChefLists(resp.data));
    } else {
      throw resp;
    }
  } catch (e) {
    console.log("erorrrrr", e);
    yield put(onErrorStopLoad());
    toast.error(e.response.data.message);
  }
}

function* updateProfileImage(action) {
  try {
    const resp = yield call(
      ApiClient.put,
      (action.url = `${ApiPath.AuthApiPath.UPDATE_CHEF_PROFILE}`),
      (action.payload = action.payload)
    );
    if (resp.status) {
      yield call(action.payload.cb, (action.res = resp));
      yield put(setUpdateProfileImage(action.payload));
      toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.error(e.response.data.data[0]);
  }
}

function* updateChefProfile(action) {
  try {
    const resp = yield call(
      ApiClient.put,
      (action.url = `${ApiPath.AuthApiPath.UPDATE_CHEF_PROFILE}`),
      (action.payload = action.payload)
    );
    if (resp.status) {
      yield call(action.payload.cb, (action.res = resp));
      yield put(setUpdateChefProfile(action.payload));
      toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.error(e.response.data.data[0]);
  }
}

function* getChefProfileDetails(action) {
  try {
    const resp = yield call(
      ApiClient.get,
      (action.url = `${ApiPath.AuthApiPath.CHEF_PROFILE_DETAILS}/${action.payload.userid}`),
      (action.payload = action.payload)
    );
    if (resp.status) {
      yield call(action.payload.cb, (action.res = resp));
      yield put(setChefProfileDetails(resp.data));
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.error(e.response.data.message);
  }
}

function* getUserProfileDetails(action) {
  try {
    const resp = yield call(
      ApiClient.get,
      (action.url = `${ApiPath.AuthApiPath.CHEF_PROFILE_DETAILS}/${action.payload.userid}`),
      (action.payload = action.payload)
    );
    if (resp.status) {
      yield call(action.payload.cb, (action.res = resp));
      yield put(setUserProfileDetails(resp.data));
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.error(e.response.data.message);
  }
}

function* webSaga() {
  yield all([takeLatest("web/getChefProfileDetails", getChefProfileDetails)]);
  yield all([takeLatest("web/updateChefProfile", updateChefProfile)]);
  yield all([takeLatest("web/updateProfileImage", updateProfileImage)]);
  yield all([takeLatest("web/getUserProfileDetails", getUserProfileDetails)]);
  yield all([takeLatest("web/chefLists", chefLists)]);
}

export default webSaga;
