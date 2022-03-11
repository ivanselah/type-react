import { useEffect } from 'react';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

/*
 * res의 body에 담겨있을 것 같지만 그렇지 않음. 이 body는 스트림이고, 데이터가 완전히 다 받아진 상태가 아닌것이다. 이 걸로는 데이터를 받아와 데이터를 뿌려줄 수가 없다. 그래서 response 객체의 json()이라는 메서드를 사용한다. json()은 Response 스트림을 가져와 스트림이 완료될때까지 읽는다. 그리고 다 읽은 body의 텍스트를 Promise형태로 반환한다.
 */

function API() {
  const init = async () => {
    const response = await (await fetch(`${BASE_URL}/posts`)).json();
    console.log(response);
  };

  useEffect(() => {
    init();
  }, []);

  return <div></div>;
}

export default API;
