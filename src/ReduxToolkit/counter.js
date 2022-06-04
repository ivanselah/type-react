import { createSlice } from '@reduxjs/toolkit';

const initialCounterState = { counter: 0, isVisible: false };

const counterSlice = createSlice({
  name: 'counter',
  initialState: initialCounterState,
  reducers: {
    increase(state, action) {
      state.counter = state.counter + action.payload;
    },
    decrease(state, action) {
      state.counter = state.counter - action.payload;
    },
    isVisible(state) {
      state.isVisible = !state.isVisible;
    },
  },
});

export const counterActions = counterSlice.actions;

export default counterSlice.reducer;
