import { useEffect, useState } from 'react';

function dalay(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function test() {
  console.log('done');
}

function PromiseT() {
  const [count, setCount] = useState(0);

  /* 
  * async 가 붙어있으면 그 함수 비동기처리되며(PromiseT)
    그안에 await 아래 다른 것들은 동기적으로 처리된다.
  */

  const superTest = async () => {
    const res = await helloAsync();
    console.log(res);
  };

  useEffect(() => {
    superTest(); // 비동기 던지고
    test(); // 바로 실행
  }, []);

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>클릭</button>
    </div>
  );
}

export default PromiseT;

async function helloAsync() {
  await dalay(3000); // 이게 끝나기 전까지 아래 코드를 실행하지 않는다.(동기적)
  console.log('Hi');
  return 'Hello Async';
}
