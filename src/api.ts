const BASE_URL = "https://jsonplaceholder.typicode.com/todos";

/*
 * React-Query
 */

export const getTodosList = async () => {
  return await (await fetch(BASE_URL)).json();
};

/*

입출력이 순수하다는 것은 반드시 하나 이상의 인자를 받고, 받은 인자를 처리하여 반드시 결과물을 돌려주어야한다는 겁니다. 
인자를 제외한 다른 변수는 사용하면 안 됩니다. 받은 인자만으로 결과물을 내어야 하죠. 
이러한 함수를 순수함수라고 부릅니다. 자바스크립트는 this라는 개념 때문에 (this를 어쩔 수 없이 사용해야하는 상황) 순수함수를 사용하기 힘듭니다. 
그래도 최대한 비슷하게 할 수는 있죠.

부작용이 없어야한다는 것은, 프로그래머가 바꾸고자하는 변수 외에는 바뀌어서는 안 된다는 뜻입니다. 원본 데이터는 불변해야함

*/
/**
 * 함수형 프로그래밍은 간단하게 설명하면 입출력이 순수하다는 것입니다.
 * 즉, 하나 이상의 인자를 받고, 받은 인자를 처리하여 반드시 결과물을 돌려주어야한다는 겁니다.
 * 또한 중요한 것은 인자를 제외한 다른 변수를 함수 내에서 사용하면 안 됩니다.
 * 그렇게 되면 부작용(Side-Effect)이 생기게 되고 프로그래머가 예측 불가한 결과 생기게 됩니다.
 * 이러한 함수를 우리는 순수 함수 라고 합니다.
 */