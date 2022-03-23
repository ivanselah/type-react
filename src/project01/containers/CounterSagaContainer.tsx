import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { increaseAsync_saga, increase_saga } from "../modules/counter_saga";
import { I_AllStateProps } from "../modules/rootReducer";
import { getFetch } from "../modules/saga_test";

function CounterSagaContainer() {
  const dispatch = useDispatch();
  const counter = useSelector((state: I_AllStateProps) => state.counterSaga);

  const onIncreaseSaga = () => dispatch(increaseAsync_saga());

  useEffect(() => {
    dispatch(getFetch("test redux-saga params"));
  }, [dispatch]);

  return <CounterSaga counter={counter} onIncreaseSaga={onIncreaseSaga} />;
}

export default CounterSagaContainer;

function CounterSaga({ counter, onIncreaseSaga }: { counter: number; onIncreaseSaga: () => void }) {
  return (
    <div>
      <span>{counter}</span>
      <button onClick={onIncreaseSaga}>click</button>
    </div>
  );
}
