import { createSlice } from '@reduxjs/toolkit';

const initialTodo = [];

const toDo = createSlice({
  name: 'toDosReducer',
  initialState: initialTodo,
  reducers: {
    add: (state, action) => {
      state.push({ text: action.payload, id: Date.now() });
    },
    remove: (state, action) => {
      return state.filter((toDo) => toDo.id !== action.payload);
    },
  },
});

export const todoActions = toDo.actions;

export default toDo.reducer;
