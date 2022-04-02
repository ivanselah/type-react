import { useDispatch, useSelector } from 'react-redux';

function CounterComponent() {
  const { counter, onIncrease, onDecrease } = useCounter();
  return (
    <div>
      <h4>{counter}</h4>
      <div>
        <button type='button' onClick={onIncrease}>
          증가
        </button>
        <button type='button' onClick={onDecrease}>
          감소
        </button>
      </div>
    </div>
  );
}

export default CounterComponent;

function useCounter() {
  const dispatch = useDispatch();
  const { counter } = useSelector((state) => state.counter);

  const onIncrease = () => {
    dispatch({ type: 'counter/INCREASE' });
  };

  const onDecrease = () => {
    dispatch({ type: 'counter/DECREASE' });
  };

  const props = {
    counter,
    onIncrease,
    onDecrease,
  };

  return { ...props };
}
