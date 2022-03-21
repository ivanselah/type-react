type CounterType = {
  number: number;
  onIncrease: () => void;
  onDecrease: () => void;
};

function Counter({ number, onIncrease, onDecrease }: CounterType) {
  return (
    <div>
      <h4>{number}</h4>
      <div>
        <button onClick={onIncrease}>+</button>
        <button onClick={onDecrease}>-</button>
      </div>
    </div>
  );
}

export default Counter;
