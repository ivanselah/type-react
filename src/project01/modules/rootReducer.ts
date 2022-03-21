import { combineReducers } from "redux";
import counter, { CounterProps } from "./counter";
import todos, { TodosProps } from "./todos";

export interface I_AllStateProps {
  counter: CounterProps;
  todos: Array<TodosProps>;
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

const rootReducer = combineReducers({
  counter,
  todos,
});

export default rootReducer;
