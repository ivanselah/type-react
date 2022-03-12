import { useEffect, useState } from 'react';
import styled from 'styled-components';

function UnMountTest() {
  useEffect(() => {
    console.log('Mount');
    return () => console.log('unMount');
  }, []);

  return <div>UnMount Testing Component!</div>;
}

function LifeCycle() {
  const [isVisible, setIsVisible] = useState(false);

  const onToggle = () => {
    setIsVisible((visible) => !visible);
  };

  return (
    <Container>
      <div>
        <button onClick={onToggle}>ON/OFF</button>
      </div>
      {isVisible && <UnMountTest />}
    </Container>
  );
}

export default LifeCycle;

const Container = styled.div`
  padding: 20px;
  font-size: 30px;
  button {
    margin-left: 50px;
    padding: 10px;
  }
`;
