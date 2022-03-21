import { useSelector, useDispatch } from "react-redux";
import Counter from "./components/Counter";
import { decrease, increase } from "./modules/counter";
import { I_AllStateProps } from "./modules/rootReducer";

function MainComponent() {
  const dispatch = useDispatch();
  const { number, diff } = useSelector((state: I_AllStateProps) => ({
    number: state.counter.counter,
    diff: state.counter.diff,
  }));

  const onIncrease = () => dispatch(increase());
  const onDecrease = () => dispatch(decrease());

  const props = {
    number,
    onIncrease,
    onDecrease,
  };

  return (
    <div>
      <Counter {...props} />
    </div>
  );
}

export default MainComponent;
