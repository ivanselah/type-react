import { useSelector, useDispatch } from "react-redux";
import Counter from "../components/Counter";
import { decrease, decreaseAsync, increase, increaseAsync } from "../modules/counter";
import { I_AllStateProps } from "../modules/rootReducer";

/* 
** 컨테이너 컴포넌트
   : 리덕스 스토어의 상태를 조회하거나, 액션을 디스패치 할 수 있는 컴포넌트
   HTML (JSX) 태그들을 사용하지 않고 다른 프리젠테이셔널 컴포넌트를 불러와서 사용
*/

function CounterContainer() {
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

  return (
    <div>
      <Counter />
    </div>
  );
}

export default CounterContainer;
