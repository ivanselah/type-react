import { delay, put, takeEvery, takeLatest } from "redux-saga/effects";

const INCREASE = "INCREASE";
const DECREASE = "DECREASE";
const INCREASE_ASYNC = "INCREASE_ASYNC";
const DECREASE_ASYNC = "DECREASE_ASYNC";

export const increase_saga = () => ({ type: INCREASE });
export const decrease_saga = () => ({ type: DECREASE });
export const increaseAsync_saga = () => ({ type: INCREASE_ASYNC });
export const decreaseAsync_saga = () => ({ type: DECREASE_ASYNC });

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
