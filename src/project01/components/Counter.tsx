import { useDispatch, useSelector } from 'react-redux';
import { decreaseAsync, ㅇ } from '../modules/counter';
import { I_AllStateProps } from '../modules/rootReducer';

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

/*
 ** 컨테이너와, 프리젠테이션을 나누지 않고 커스텀 훅으로 사용하는 방법 권장
 */

function Counter() {
  const { counter, diff, onIncrease, onDecrease } = useCounter();
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

function useCounter() {
  const dispatch = useDispatch();
  const { counter, diff } = useSelector((state: I_AllStateProps) => state.counter);

  const onIncrease = () => dispatch(increaseAsync()); //
  const onDecrease = () => dispatch(decreaseAsync());

  const counterProps = {
    counter,
    diff,
    onIncrease,
    onDecrease,
  };

  return { ...counterProps };
}
