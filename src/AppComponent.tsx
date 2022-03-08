import { useEffect, useReducer, useRef, useState } from "react";

function Childone() {
  useEffect(() => {
    console.log("one");
  });
  return (
    <div>
      <Childtwo />
    </div>
  );
}

function Childtwo() {
  useEffect(() => {
    console.log("two");
  });
  return <div></div>;
}

const friendList = [
  { id: 1, name: "Phoebe" },
  { id: 2, name: "Rachel" },
  { id: 3, name: "Ross" },
];

function useFriendStatus(friendID: number) {
  const [isOnline, setIsOnline] = useState<boolean>(false);

  useEffect(() => {
    if (friendID === 2) {
      setIsOnline(true);
    } else {
      setIsOnline(false);
    }
  }, [friendID]);

  return isOnline;
}

type ActionProps = {
  type: "INCRE" | "DECRE";
};

function reducer(state: number, action: ActionProps) {
  switch (action.type) {
    case "INCRE":
      return state + 1;
    case "DECRE":
      return state - 1;
    default:
      return state;
  }
}

function AppComponent() {
  const [count, setCount] = useState<string[]>(["1", "2"]);
  const [recipientID, setRecipientID] = useState(1);
  const [number, dispatch] = useReducer(reducer, 0);
  const btnRef = useRef<HTMLButtonElement>(null); // RefObject <= Read Only
  const idRef = useRef<number>(0); // MutableRefObject
  /*
   * Hook => should use : use + functionName, coz don't know to use Hook inner.
   */
  const isRecipientOnline = useFriendStatus(recipientID);

  useEffect(() => {
    // console.log(isRecipientOnline);
  }, [isRecipientOnline]);

  /*
   * Hook => useReducer state에 하위 요소들이 많을 때 컴포넌트 밖에서 state를 컨트롤 하고 싶을 때
   */
  useEffect(() => {
    console.log(number);
  }, [number]);

  const clickHandleDispatch = () => {
    dispatch({ type: "INCRE" });
  };

  /*
   * Hook => useRef DOM 조작 및 컴포넌트 내에서 변수 관리, 자동 렌더 안됨
     useRef 로 관리하고 있는 변수는 설정 후 바로 조회 가능
   */
  useEffect(() => {
    console.log(btnRef.current);
    idRef.current = 10;
  });

  return (
    <div>
      <Childone />
      {console.log(idRef.current)}
      <h1 color={isRecipientOnline ? "green" : "red"}>Hello</h1>
      <select value={recipientID} onChange={(e) => setRecipientID(Number(e.target.value))}>
        {friendList.map((friend) => (
          <option key={friend.id} value={friend.id}>
            {friend.name}
          </option>
        ))}
      </select>
      <button ref={btnRef} onClick={clickHandleDispatch}>
        Dispatch
      </button>
    </div>
  );
}

// two => one => test
// 부모컴포넌트는 자식컴포넌트들이 렌더링이 다 될때까지 실행되지 않음.

export default AppComponent;
