import axios from "axios";
import { Action } from "redux";
import { call, put, takeEvery, all } from "redux-saga/effects";
import { PlaceholderProps } from "./pleaceholder";

const GET_START = "GET_START";
const GET_DATA_SUCCESS = "GET_DATA_SUCCESS";
const GET_DATA_ERROR = "GET_DATA_ERROR";

export const getFetch = (params: string) => ({ type: GET_START, params });
export const getData = (id: number) => ({ type: GET_START, payload: id, meta: id });

async function getUserInfo(param: string): Promise<PlaceholderProps> {
  console.error(param);
  return await (await fetch("https://jsonplaceholder.typicode.com/todos/1")).json();
}

type ActionProps = { type: string; params: string };

function* getDataSaga(action: ActionProps) {
  console.log(action.params);
  try {
    const props: PlaceholderProps = yield call(getUserInfo, action.params);
    yield put({ type: GET_DATA_SUCCESS, payload: props });
  } catch (e) {
    yield put({ type: GET_DATA_ERROR, error: true, payload: e });
  }
}

export function* watchDataSaga() {
  yield takeEvery(GET_START, getDataSaga);
}

export default function dataSaga(state: any = 1, action: any) {
  switch (action.type) {
    case GET_START: {
      console.error("ok");
      return state;
    }
    case GET_DATA_SUCCESS: {
      console.error(action.payload, "?");
      return state;
    }
    default:
      return state;
  }
}
