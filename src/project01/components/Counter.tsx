type CounterType = {
  counter: number;
  diff: number;
  onIncrease: () => void;
  onDecrease: () => void;
};

/* 
** 프리젠테이셔널 컴포넌트
   : 리덕스 스토어에 직접 접근하지 않고 필요한 값 또는 함수를 props로만 받아서와서 사용하는 컴포넌트
*/

function Counter({ counter, diff, onIncrease, onDecrease }: CounterType) {
  return (
    <div>
      <h4>{counter}</h4>
      <div>
        <button onClick={onIncrease}>+</button>
        <button onClick={onDecrease}>-</button>
      </div>
    </div>
  );
}

export default Counter;
