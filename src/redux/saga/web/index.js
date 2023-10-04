import { all, call, put, takeLatest } from "redux-saga/effects";
import { ApiClient } from "../../../utilities/api";
import ApiPath from "../../../constants/apiPath";
import { toast } from "react-toastify";
import { setChefProfileDetails, onErrorStopLoad } from "../../slices/web";

function* getChefProfileDetails(action) {
  try {
    const resp = yield call(
      ApiClient.get,
      (action.url = `${ApiPath.AuthApiPath.CHEF_PROFILE_DETAILS}/${action.payload.userid}`),
      (action.payload = action.payload)
    );
    if (resp.status) {
      yield call(action.payload.cb, (action.res = resp));
      yield put(setChefProfileDetails(action.payload));
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
}

export default webSaga;
