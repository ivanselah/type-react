import { useEffect, useMemo, useReducer, useRef, useState } from 'react';

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
    Memo 는 'memoized' 이전에 계산 한 값을 재사용한다라는 의미
  */

  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const activeCount = useMemo(() => countActiveUser(users), [users]);

  const onToggle = (id: number) => {
    setUsers(users.map((user) => (user.id === id ? { ...user, active: !user.active } : user)));
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
      <form>
        <input value={userName} type="text" placeholder="아이디" onChange={(e) => setUserName(e.currentTarget.value)} />
        <input value={userEmail} type="text" placeholder="이메일" onChange={(e) => setUserEmail(e.currentTarget.value)} />
      </form>
      <UserList users={users} onToggle={onToggle} />
      <button ref={btnRef} onClick={clickHandleDispatch}>
        Dispatch
      </button>
      <div>활성사용자 수 : {activeCount}</div>
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
