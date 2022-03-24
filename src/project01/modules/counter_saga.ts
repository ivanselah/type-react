import { delay, put, takeEvery, takeLatest } from "redux-saga/effects";
import { createAction } from "@reduxjs/toolkit";

const INCREASE = "INCREASE";
const DECREASE = "DECREASE";
const INCREASE_ASYNC = "INCREASE_ASYNC";
const DECREASE_ASYNC = "DECREASE_ASYNC";

export const increase_saga = createAction(INCREASE);
export const decrease_saga = createAction(DECREASE);
export const increaseAsync_saga = createAction(INCREASE_ASYNC);
export const decreaseAsync_saga = createAction(DECREASE_ASYNC);

function* increaseSaga() {
  yield delay(1000);
  yield put(increase_saga());
}

function* decreaseSaga() {
  yield delay(1000);
  yield put(decrease_saga());
}

const initialState = 0;

type ActionProps = "INCREASE" | "DECREASE" | "INCREASE_ASYNC" | "DECREASE_ASYNC";

export function* counterSaga() {
  yield takeEvery(INCREASE_ASYNC, increaseSaga);
  yield takeLatest(DECREASE_ASYNC, decreaseSaga);
}

export default function ccounter(state: number = initialState, action: { type: ActionProps }) {
  switch (action.type) {
    case "INCREASE":
      return state + 1;
    case "DECREASE":
      return state - 1;
    default:
      return state;
  }
}
