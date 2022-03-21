import { combineReducers } from "redux";
import counter, { CounterProps } from "./counter";
import todos, { TodosProps } from "./todos";

export interface I_AllStateProps {
  counter: CounterProps;
  todos: TodosProps;
}

const rootReducer = combineReducers({
  counter,
  todos,
});

export default rootReducer;
