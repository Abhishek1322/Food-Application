import { all, fork, spawn } from "redux-saga/effects";
import authSaga from "./auth";
import webSaga from "./web";
import userSaga from "./user";

export default function* rootSaga() {
  yield all([spawn(authSaga), spawn(webSaga), spawn(userSaga)]);
}
