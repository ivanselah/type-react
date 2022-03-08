import { useEffect, useReducer, useState } from "react";

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
  /*
   * Hook => should use : use + functionName, coz don't know to use Hook inner.
   */
  const isRecipientOnline = useFriendStatus(recipientID);

  useEffect(() => {
    // console.log(isRecipientOnline);
  }, [isRecipientOnline]);

  useEffect(() => {
    console.log(number);
  }, [number]);

  const clickHandleDispatch = () => {
    dispatch({ type: "INCRE" });
  };

  return (
    <div>
      <Childone />
      <h1 color={isRecipientOnline ? "green" : "red"}>Hello</h1>
      <select value={recipientID} onChange={(e) => setRecipientID(Number(e.target.value))}>
        {friendList.map((friend) => (
          <option key={friend.id} value={friend.id}>
            {friend.name}
          </option>
        ))}
      </select>
      <button onClick={clickHandleDispatch}>Dispatch</button>
    </div>
  );
}

// two => one => test
// 부모컴포넌트는 자식컴포넌트들이 렌더링이 다 될때까지 실행되지 않음.

export default AppComponent;
