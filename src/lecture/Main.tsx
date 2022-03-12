import Child from './Child';

function Main() {
  const childProps = {
    hello: 1,
    victory: 'win',
    initalValue: 5,
  };

  return (
    <div className="Main">
      <Child {...childProps} />
    </div>
  );
}

export default Main;
