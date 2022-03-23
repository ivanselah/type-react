import { combineReducers } from "redux";
import counter, { CounterProps } from "./counter";
import todos, { TodosProps } from "./todos";
import placeholder, { PlaceholderProps } from "./pleaceholder";
import ccounter from "./counter_saga";
import { all } from "redux-saga/effects";
import { counterSaga } from "./counter_saga";
import dataSaga, { watchDataSaga } from "./saga_test";

export interface I_AllStateProps {
  counter: CounterProps;
  todos: Array<TodosProps>;
  placeholder: PlaceholderProps;
  counterSaga: number;
}

/*
** redux -> 
   1. each state reducer function,
   2. combine every reducers
   3. index.tsx : create store by rootReducer and 
   4. inject store into Provider's children
*/

/**
 * All Children can get state and set state to dispatch function.
 */

// Redux-thunk
const rootReducer = combineReducers({
  counter,
  todos,
  placeholder,
  dataSaga,
  ccounter,
});

/*
 * 여러개의 saga 를  합쳐서 rootSaga 를 만듬
 */

export function* rootSaga() {
  yield all([counterSaga(), watchDataSaga()]); // all 은 배열 안의 여러 saga 를 동시에 실행시킴
}

export default rootReducer;
