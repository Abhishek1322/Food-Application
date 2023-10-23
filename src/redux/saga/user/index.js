import { all, call, put, takeLatest } from "redux-saga/effects";
import { ApiClient } from "../../../utilities/api";
import ApiPath from "../../../constants/apiPath";
import { toast } from "react-toastify";
import {
  setAddAddress,
  setGetUserAddress,
  onErrorStopLoad,
  setEditUserAddress,
  setSingleAddress,
  setDeleteAddress,
  setAddContactUsDetail,
  setGetHelperPages,
  setAddToCart,
  setGetAllCart,
  setDeleteCartItem,
  setGetAllCartCartCount,
} from "../../slices/user";

// Worker saga will be fired on USER_FETCH_REQUESTED actions

function* getAllCartCartCount(action) {
  try {
    const resp = yield call(
      ApiClient.get,
      (action.url = ApiPath.userApiPath.ALL_CART_COUNT),
      (action.payload = action.payload)
    );
    if (resp.status) {
      yield put(setGetAllCartCartCount(resp.data.data));
      yield call(action.payload.cb, resp);
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

function* deleteCartItem(action) {
  try {
    const resp = yield call(
      ApiClient.put,
      (action.url = `${ApiPath.userApiPath.REMOVE_CART}`),
      (action.payload = action.payload)
    );
    if (resp.status) {
      yield put(setDeleteCartItem(resp.data.data));
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

function* getAllCart(action) {
  try {
    const resp = yield call(
      ApiClient.get,
      (action.url = ApiPath.userApiPath.ALL_CART),
      (action.payload = action.payload)
    );
    if (resp.status) {
      yield put(setGetAllCart(resp.data.data));
      yield call(action.payload.cb, resp);
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

function* addToCart(action) {
  try {
    const resp = yield call(
      ApiClient.post,
      (action.url = ApiPath.userApiPath.ADD_CART),
      (action.payload = action.payload)
    );
    if (resp.status) {
      yield put(setAddToCart(resp.data.data));
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

function* getHelperPages(action) {
  try {
    const resp = yield call(
      ApiClient.get,
      (action.url = `${ApiPath.userApiPath.HELPER_PAGES_BY_SLUG}/${action.payload.slug}`),
      (action.payload = action.payload)
    );
    if (resp.status) {
      yield put(setGetHelperPages(resp.data.data));
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

function* addContactUsDetail(action) {
  try {
    const resp = yield call(
      ApiClient.post,
      (action.url = ApiPath.userApiPath.CONTACT_US),
      (action.payload = action.payload)
    );
    if (resp.status) {
      yield put(setAddContactUsDetail(resp.data.data));
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

function* deleteAddress(action) {
  try {
    const resp = yield call(
      ApiClient.delete,
      (action.url = `${ApiPath.userApiPath.GET_SINGLE_ADDRESS}/${action.payload.id}`),
      (action.payload = action.payload)
    );
    if (resp.status) {
      yield put(setDeleteAddress(resp.data.data));
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

function* singleAddress(action) {
  try {
    const resp = yield call(
      ApiClient.get,
      (action.url = `${ApiPath.userApiPath.GET_SINGLE_ADDRESS}/${action.payload.id}`),
      (action.payload = action.payload)
    );
    if (resp.status) {
      yield put(setSingleAddress(resp.data.data));
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

function* editUserAddress(action) {
  const deleteParams = { ...action.payload };
  delete deleteParams.id;
  try {
    const resp = yield call(
      ApiClient.put,
      (action.url = `${ApiPath.userApiPath.EDIT_ADDRESS}/${action.payload.id}`),
      (action.payload = deleteParams)
    );
    if (resp.status) {
      yield put(setEditUserAddress(resp.data.data));
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
  yield all([takeLatest("user/editUserAddress", editUserAddress)]);
  yield all([takeLatest("user/singleAddress", singleAddress)]);
  yield all([takeLatest("user/deleteAddress", deleteAddress)]);
  yield all([takeLatest("user/addContactUsDetail", addContactUsDetail)]);
  yield all([takeLatest("user/getHelperPages", getHelperPages)]);
  yield all([takeLatest("user/addToCart", addToCart)]);
  yield all([takeLatest("user/getAllCart", getAllCart)]);
  yield all([takeLatest("user/deleteCartItem", deleteCartItem)]);
  yield all([takeLatest("user/getAllCartCartCount", getAllCartCartCount)]);
}

export default userSaga;
