import { memo, useEffect, useState } from 'react';

const TextView = memo(({ text }: { text: string }) => {
  useEffect(() => {
    console.log('Update :: Text');
  });
  return <div>{text}</div>;
});

const CountView = memo(({ count }: { count: number }) => {
  useEffect(() => {
    console.log('Update :: Count');
  });
  return <div>{count}</div>;
});

function OptimizeTest() {
  const [count, setCount] = useState(1);
  const [text, setText] = useState('');

  return (
    <div style={{ padding: 30 }}>
      <div>
        <h2>count</h2>
        <CountView count={count} />
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>
      <div>
        <h2>text</h2>
        <TextView text={text} />
        <input value={text} onChange={(e) => setText(e.currentTarget.value)} />
      </div>
    </div>
  );
}

export default OptimizeTest;
