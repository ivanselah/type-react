import { useMemo, useState } from "react";

function Test() {
  const [ex, setEx] = useState(0);
  const [ey, setEy] = useState(0);

  useMemo(() => {
    console.log(ex);
  }, [ex]);

  return (
    <>
      <button onClick={() => setEx((curr) => curr + 1)}>X</button>
      <button onClick={() => setEy((curr) => curr + 1)}>Y</button>
    </>
  );
}

export default Test;
