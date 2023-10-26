import { all, call, put, takeLatest } from "redux-saga/effects";
import { ApiClient } from "../../../utilities/api";
import ApiPath from "../../../constants/apiPath";
import { toast } from "react-toastify";
import {
  setGetRecentOrder,
  setAcceptOrder,
  onErrorStopLoadChef,
  setGetSingleOrderDetail,
} from "../../slices/chef";

function* getSingleOrderDetail(action) {
  try {
    const resp = yield call(
      ApiClient.get,
      (action.url = `${ApiPath.chefApiPath.GET_CHEF_SINGLE_ORDER}/${action.payload.id}`),
      (action.payload = action.payload)
    );
    if (resp.status) {
      yield put(setGetSingleOrderDetail(resp.data.data));
      yield call(action.payload.cb, resp);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoadChef());
    toast.dismiss();
    toast.error(e.response.data.message);
  }
}

function* getRecentOrder(action) {
  try {
    const resp = yield call(
      ApiClient.get,
      (action.url = `${ApiPath.chefApiPath.GET_RECENT_ORDER}?search=${action.payload.search}`),
      (action.payload = action.payload)
    );
    if (resp.status) {
      yield put(setGetRecentOrder(resp.data.data));
      yield call(action.payload.cb, resp);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoadChef());
    toast.dismiss();
    toast.error(e.response.data.message);
  }
}

function* acceptOrder(action) {
  const deleteParams = { ...action.payload };
  delete deleteParams.id;

  try {
    const resp = yield call(
      ApiClient.patch,
      (action.url = `${ApiPath.chefApiPath.ACCEPT_ORDER}/${action.payload.id}`),
      (action.payload = deleteParams)
    );
    if (resp.status) {
      yield put(setAcceptOrder(resp.data.data));
      yield call(action.payload.cb, resp);
      toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoadChef());
    toast.dismiss();
    toast.error(e.response.data.message);
  }
}

function* chefSaga() {
  yield all([takeLatest("chef/getRecentOrder", getRecentOrder)]);
  yield all([takeLatest("chef/acceptOrder", acceptOrder)]);
  yield all([takeLatest("chef/getSingleOrderDetail", getSingleOrderDetail)]);
}

export default chefSaga;
