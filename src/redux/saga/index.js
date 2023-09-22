import { all, fork, spawn } from "redux-saga/effects";
import authSaga from "./auth";

export default function* rootSaga() {
    yield all([
        spawn(authSaga),
    ]);
}
