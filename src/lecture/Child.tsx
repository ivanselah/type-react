import { ReactNode, useEffect, useState } from 'react';

type PropsType = {
  hello: number;
  victory: string;
  initalValue: number;
};

const Container = ({ children }: { children: ReactNode }) => {
  return <div>{children}</div>;
};

function Child(props: PropsType) {
  const [count, setCount] = useState(props.initalValue);

  return (
    <Container>
      {console.log('부모')}
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>증가</button>
      <button onClick={() => setCount(count - 1)}>감소</button>
      <OddEvenResult count={count} />
    </Container>
  );
}

Child.defaultProps = {
  initalValue: 0,
};

export default Child;

function OddEvenResult({ count }: { count: number }) {
  return (
    <div>
      {console.log('자식')}
      <h2>{count % 2 === 0 ? '짝수' : '홀수'}</h2>
    </div>
  );
}
