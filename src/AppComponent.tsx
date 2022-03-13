import React, { Dispatch, memo, SetStateAction, useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react';

function Childone() {
  useEffect(() => {
    console.log('one');
  });
  return (
    <div>
      <Childtwo />
    </div>
  );
}

function Childtwo() {
  useEffect(() => {
    console.log('two');
  });
  return <div></div>;
}

const friendList = [
  { id: 1, name: 'Phoebe' },
  { id: 2, name: 'Rachel' },
  { id: 3, name: 'Ross' },
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
  type: 'INCRE' | 'DECRE';
};

function reducer(state: number, action: ActionProps) {
  switch (action.type) {
    case 'INCRE':
      return state + 1;
    case 'DECRE':
      return state - 1;
    default:
      return state;
  }
}

type UsersProps = {
  id: number;
  username: string;
  email: string;
  active: boolean;
};

function countActiveUser(users: UsersProps[]) {
  console.log('사용자 수 세는 중....', users);
  return users.filter((user) => user.active).length;
}

function AppComponent() {
  const [count, setCount] = useState<number>(0);
  const [recipientID, setRecipientID] = useState(1);
  const [number, dispatch] = useReducer(reducer, 0);
  const btnRef = useRef<HTMLButtonElement>(null); // RefObject <= Read Only
  const idRef = useRef<number>(0); // MutableRefObject
  const [users, setUsers] = useState([
    {
      id: 1,
      username: 'velopert',
      email: 'public@gmail.com',
      active: true,
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com',
      active: false,
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com',
      active: false,
    },
  ]);
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
    dispatch({ type: 'INCRE' });
  };

  /*
   * Hook => useRef DOM 조작 및 컴포넌트 내에서 변수 관리, 자동 렌더 안됨
     useRef 로 관리하고 있는 변수는 설정 후 바로 조회 가능
   */
  useEffect(() => {
    idRef.current = 10;
  });

  /* 
   * Hook => useMemo, 다른 state에 변화로 인해 불필요하게 계속 렌더됨
    Memo 는 'memoized' 이전에 계산 한 값을 재사용한다라는 의미 (값!!!!!을 기억!!!!)
    ⭐️ 중요 : useMemo 안에 callback이 리턴하는 값을 리턴하므로 함수가 아니다.
  */

  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const activeCount = useMemo(() => countActiveUser(users), [users]);

  // const hello = activeCount(); <= ❌,  const hello = activeCount <= ⭕️

  const onToggle = useCallback((id: number) => {
    console.log('onToggle');
    setUsers((users) => {
      return users.map((user) => (user.id === id ? { ...user, active: !user.active } : user));
    });
  }, []);

  /*
  * Hook => useEffect, React는 브라우저가 모두 그려질 때까지 
            useEffect의 수행을 지연하기때문에 다른 작업에 영향을 주지 않는다.
            effect 함수 안에서 참조되는 모든 값은 의존성 값의 배열에 드러나야 한다.
  */

  /*
  * Hook => useState,비동기, 여러번 호출하면 batch하여 state를 업데이트 한다.
    매번 호출 순서대로 바로 업데이트하지 않고 인자로 전달된 객체들을 하나로 합치는 작업을 함(오브젝트 컴포지션)
    함수형업데이트 => 객체형태가 아니라 함수로 전달하면 오브젝트 컴포지션을 하지 않고 호출된 순서대로 큐에 넣고
    큐에 넣어진 대로 함수를 실행
    https://darrengwon.tistory.com/788
  */

  // const onClickPlus = () => {
  //   setCount(count + 1);
  //   setCount(count + 1);
  //   setCount(count + 1);
  // };

  const onClickPlus = () => {
    setCount((curr) => curr + 1);
    setCount((curr) => curr + 1);
    setCount((curr) => curr + 1);
  };

  return (
    <div>
      <Childone />
      <h1 color={isRecipientOnline ? 'green' : 'red'}>Hello</h1>
      <select value={recipientID} onChange={(e) => setRecipientID(Number(e.target.value))}>
        {friendList.map((friend) => (
          <option key={friend.id} value={friend.id}>
            {friend.name}
          </option>
        ))}
      </select>
      <MemoCreateUser userName={userName} setUserName={setUserName} userEmail={userEmail} setUserEmail={setUserEmail} />
      <MemoUserList users={users} onToggle={onToggle} />
      <button ref={btnRef} onClick={clickHandleDispatch}>
        Dispatch
      </button>
      <div>활성사용자 수 : {activeCount}</div>
      <h1>{count}</h1>
      <button onClick={onClickPlus}>PLUS</button>
    </div>
  );
}

// two => one => test
// 부모컴포넌트는 자식컴포넌트들이 렌더링이 다 될때까지 실행되지 않음.

export default AppComponent;

function UserList({ users, onToggle }: { users: UsersProps[]; onToggle: (id: number) => void }) {
  return (
    <ul>
      {users.map((user, index) => (
        <li key={user.id} style={{ display: 'flex' }}>
          <div>{user.email}</div>
          <div style={{ marginLeft: '10px' }}>
            <button
              onClick={() => {
                onToggle(user.id);
              }}
            >
              {user.active ? '비활성' : '활성'}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

// 💡 고차컴포넌트란 => 컴포넌트안에 컴포넌트를 넣으면 또다른 컴포넌트를 준다.

// Hook => 특정 값을 비교해서 변경이 없다면(같다면) 리 렌더 하지 않음
/*
 * 컴퍼넌트가 React.memo() === memo 로 래핑 될 때, 
    React는 컴퍼넌트를 렌더링하고 결과를 메모이징(Memoizing)한다. 
   그리고 다음 렌더링이 일어날 때 props가 같다면(전달된 props가 변하지 않는다면), React는 메모이징(Memoizing)된 내용을 재사용한다.(가상DOM확인안함) 즉 => 컴포넌트 재사용
   shallow 비교함
 */

/* function MovieViewsRealtime() { 
  title, 
  releaseDate
  views

  주기적으로 서버에서 데이터를 가져와서 views를 업데이트 한다.
  views 업데이트 될때마다 MovieViewsRealtime 컴포넌트 또한 리렌더링 한다.
  이때 Moive 컴포넌트 또한 title, releaseDate 가 같음에도 불구하고 리렌더링 한다.
  이럴때 React.memo 를 사용할 수 있다.
  
  return (
    <div>
      <Movie title={title} releaseDate={releaseDate} />
      Movie views: {views}
    </div>
  );
}
*/

// => 특정 props를 비교해서 렌더링을 컨트롤하는 것은 이후 버그를 발생시킬 수 있으므로 신중하게 한다.
// 함수업데이트를 사용하지 않을 시 onToggle에서 최신 users 배열을 참조하지 않으므로 심각한 오류가 발생 할 수 있습니다.
// export const MemoUserList = React.memo(UserList, areEqual);
const MemoUserList = React.memo(UserList);

// => memo 로 감쌌지만 리렌더링이 발생한다.
// 이유는 얇은 비교 때문이다. 객체 안에 count 의 값은 같을 수 있으나
// obj의 주소값이 다르므로 변경됬다고 판단하여 리렌더링이 발생한다.
// 이럴 땐 memo 두번째 인자로 판별하는 callback 함수를 전달한다. (true 같음, false 변경됨)

const areEqual = (preProps: { obj: { count: number } }, nextProps: { obj: { count: number } }) => {
  if (preProps.obj.count === nextProps.obj.count) {
    return true;
  }
  return false;
};
const ConterB = memo(({ obj }: { obj: { count: number } }) => {
  useEffect(() => {
    console.log('ConterB Update');
  });
  return <div>{obj.count}</div>;
});

const MemoCounterB = memo(ConterB, areEqual);

function MemoTest() {
  const [obj, setObj] = useState({
    count: 1,
  });
  return (
    <div>
      <h2>{obj.count}</h2>
      <MemoCounterB obj={obj} />
      <button
        onClick={() => {
          setObj({
            count: obj.count,
          });
        }}
      ></button>
    </div>
  );
}

function CreateUser({
  userName,
  userEmail,
  setUserName,
  setUserEmail,
}: {
  userName: string;
  userEmail: string;
  setUserName: Dispatch<SetStateAction<string>>;
  setUserEmail: Dispatch<SetStateAction<string>>;
}) {
  return (
    <form>
      <input value={userName} type="text" placeholder="아이디" onChange={(e) => setUserName(e.currentTarget.value)} />
      <input value={userEmail} type="text" placeholder="이메일" onChange={(e) => setUserEmail(e.currentTarget.value)} />
    </form>
  );
}

export const MemoCreateUser = React.memo(CreateUser);
