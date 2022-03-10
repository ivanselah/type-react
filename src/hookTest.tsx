import React, { useReducer } from 'react';

type ActionType = {
  type: 'inc' | 'dec';
};

function reducerFunc(count: number, action: ActionType) {
  switch (action.type) {
    case 'inc':
      return count + 1;
    case 'dec':
      return count - 1;
    default:
      throw new Error(`${action.type}`);
  }
}
/*
 * dispatch 함수의 동일성이 안정적이고 리렌더링 시에도 변경되지 않는다.
 */
function HookTest() {
  const [count, dispatch] = useReducer(reducerFunc, 0);

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => dispatch({ type: 'inc' })}>클릭</button>
    </div>
  );
}

export default HookTest;
