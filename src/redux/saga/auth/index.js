import { all, call, put, takeLatest } from 'redux-saga/effects'
import { ApiClient } from '../../../utilities/api';
import { onErrorStopLoad, setLogout, setUserLogin, } from '../../slices/auth';
import ApiPath from '../../../constants/apiPath';
import { toast } from 'react-toastify';

// Worker saga will be fired on USER_FETCH_REQUESTED actions
function* userLogin(action) {
  try {
    // const resp = yield call(ApiClient.post, action.url = `${ApiPath.CREATE_USER}/name=${action.payload.name}`);
    const resp = yield call(ApiClient.post, action.url = ApiPath.AuthApiPath.LOGIN_USER, action.payload = action.payload);
    if (resp.status) {
      localStorage.setItem("authToken", resp.data.payload.token ? resp.data.payload.token : "")
      yield put(setUserLogin(resp.data.payload));
      yield call(action.payload.cb, action.res = resp)
      // toast.success(action.res.data.msg);
    }
    else {
      throw resp
    }
  } catch (e) {
    yield put(setUserLogin({}));
    yield put(onErrorStopLoad())
    toast.error(e.response.data.msg);
  }
}



function* userLogout(action) {
  try {
    const resp = yield call(ApiClient.get, action.url = ApiPath.AuthApiPath.LOGOUT_USER, action.payload = action.payload);
    if (resp.status) {
      yield call(action.payload.cb, action.res = resp)
      localStorage.removeItem('authToken');
      localStorage.removeItem('persist:root');
      // toast.success(action.res.data.msg);
      yield put(setLogout())
    }
    else {
      throw resp
    }
  } catch (e) {
    toast.error(e.response.data.msg);
  }
}
function* authSaga() {
  yield all([
    takeLatest('auth/userLogin', userLogin),
    takeLatest('auth/logout', userLogout),
  ])
}

export default authSaga;