import React, { createContext, useContext, useState } from "react";

interface UserContextProps {
  user: {
    username: string;
  };
}

const UserContext = createContext({} as UserContextProps);

interface UserUpdateContextProps {
  setUser: React.Dispatch<React.SetStateAction<UserContextProps["user"]>>;
}

const UserUpdateContext = createContext({} as UserUpdateContextProps);

function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState({
    username: "",
  });

  return (
    <UserContext.Provider value={{ user }}>
      <UserUpdateContext.Provider value={{ setUser }}>{children}</UserUpdateContext.Provider>
    </UserContext.Provider>
  );
}

function ContextComponent() {
  return (
    <UserProvider>
      <TestOneComponent />
      <TestTwoComponent />
    </UserProvider>
  );
}

export default ContextComponent;

function TestOneComponent() {
  const {
    user: { username },
  } = useContext(UserContext);
  console.log("TestOne => UserInfo re-render");

  return (
    <div>
      <span>{username}</span>
    </div>
  );
}

function TestTwoComponent() {
  const { setUser } = useContext(UserUpdateContext);
  console.log("TestTwo => Authen re-render");

  const username = { username: "" };

  const onClick = () => setUser(username);

  return <button onClick={onClick}>update</button>;
}
