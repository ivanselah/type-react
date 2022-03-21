import React, { useState } from "react";
import { TodosProps } from "../modules/todos";

type TodosTypes = {
  todos: Array<TodosProps>;
  onCreate: (text: string) => void;
  onToggle: (id: number) => void;
};

function Todos({ todos, onCreate, onToggle }: TodosTypes) {
  const [text, setText] = useState("");

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.currentTarget.value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onCreate(text);
    setText("");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={text} placeholder="please input todo.." onChange={onChange} />
        <button type="submit">Enter</button>
      </form>
      <TodoList todos={todos} onToggle={onToggle} />
    </div>
  );
}

export default Todos;

const TodoList = React.memo(function TodoList({ todos, onToggle }: Omit<TodosTypes, "onCreate">) {
  return (
    <ul>
      {todos.map((todo) => {
        console.log(todo.id);
        return <TodoItem key={todo.id} todo={todo} onToggle={onToggle} />;
      })}
    </ul>
  );
});

const TodoItem = React.memo(function TodoItem({
  todo,
  onToggle,
}: {
  todo: TodosProps;
  onToggle: TodosTypes["onToggle"];
}) {
  return (
    <li style={{ textDecoration: todo.done ? "line-through" : "none" }} onClick={() => onToggle(todo.id)}>
      {todo.text}
    </li>
  );
});
