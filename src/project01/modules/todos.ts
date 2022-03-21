const ADD_TODO = "todos/ADD_TODO";
const TOGGLE_TODO = "todos/TOGGLE_TODO";

let nextId = 1;

export const addTodo = (text: string) => ({
  type: ADD_TODO,
  todo: {
    id: nextId++,
    text,
  },
});

export const toggleTodo = (id: number) => ({
  type: TOGGLE_TODO,
  id,
});

const initialState = [
  {
    id: 1,
    text: "",
    done: false,
  },
];

export type TodosProps = { id: number; text: string; done: boolean };

type ActionProps = {
  type: "todos/ADD_TODO" | "todos/TOGGLE_TODO";
  todo: [];
  id: number;
};

export default function todos(state: Array<TodosProps> = initialState, action: ActionProps) {
  switch (action.type) {
    case ADD_TODO:
      return [...state, action.todo];
    case TOGGLE_TODO:
      return state.map((todo) => (todo.id === action.id ? { ...todo, done: !todo.done } : todo));
    default:
      return state;
  }
}
