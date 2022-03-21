import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Todos from "../components/Todos";
import { I_AllStateProps } from "../modules/rootReducer";
import { addTodo, toggleTodo } from "../modules/todos";

function TodosContainer() {
  const dispatch = useDispatch();

  const onCreate = (text: string) => dispatch(addTodo(text));
  const onToggle = useCallback((id: number) => dispatch(toggleTodo(id)), [dispatch]);

  const todos = useSelector((state: I_AllStateProps) => state.todos);

  return <Todos todos={todos} onCreate={onCreate} onToggle={onToggle} />;
}

export default TodosContainer;
