import { all, call, put, takeLatest } from "redux-saga/effects";
import { ApiClient } from "../../../utilities/api";
import ApiPath from "../../../constants/apiPath";
import { toast } from "react-toastify";
import { setAddAddress, onErrorStopLoad } from "../../slices/user";

// Worker saga will be fired on USER_FETCH_REQUESTED actions

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
    toast.error(e.response.data.message);
  }
}

function* userSaga() {
  yield all([takeLatest("user/addAddress", addAddress)]);
}

export default userSaga;
