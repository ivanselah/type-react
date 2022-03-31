import { useCallback, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { getTodosList } from "../../api";
import Todos from "../components/Todos";
import { I_AllStateProps } from "../modules/rootReducer";
import { addTodo, toggleTodo } from "../modules/todos";

type TodoListQuery = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

function TodosContainer() {
  const { isLoading, data,  } = useQuery<TodoListQuery[]>("todos", getTodosList);
  const [todo, setTodo] = useState<TodoListQuery[]>([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoading && data) {
      setTodo(data);
    }
  }, [isLoading, data]);

  console.log(todo);

  const onCreate = (text: string) => dispatch(addTodo(text));
  const onToggle = useCallback((id: number) => dispatch(toggleTodo(id)), [dispatch]);

  const todos = useSelector((state: I_AllStateProps) => state.todos);

  return <Todos todos={todos} onCreate={onCreate} onToggle={onToggle} />;
}

export default TodosContainer;
