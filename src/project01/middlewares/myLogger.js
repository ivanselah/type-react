const myLogger = (store) => (next) => (action) => {
  console.log(action); // action output
  const result = next(action); // the action will be sent to middleware or reducer

  console.log("\t", store.getState()); // after update, check state

  return result; // dispatch(action)
};

export default myLogger;

const thunk = (store) => (next) => (action) => {
  typeof action === "function" ? action(store.dispatch, store.getState) : next(action);
};

// action === 'function'
const myThunk = () => (dispatch, getState) => {
  dispatch({ type: "" });
  dispatch({ type: "" });
};
