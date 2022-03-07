import { IconDefinition, SizeProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactDOM from "react-dom";
import React, { MutableRefObject, useEffect, useState } from "react";

interface IconProps {
  icon: IconDefinition;
  size: SizeProp;
}

function FAIcon(props: IconProps) {
  return <FontAwesomeIcon {...props} />;
}

export default FAIcon;

export function Test1({ hello }: { hello: JSX.Element }) {
  console.log(hello);
  return <></>;
}

type RefProps = {
  ref: {
    current: string;
  };
};

export const Hello = React.forwardRef<HTMLDivElement, any>((props, ref) => {
  const [count, seCount] = useState(0);

  useEffect(() => {
    const purpleCuteSlime = {
      name: "슬라임",
      attribute: "cute",
      color: "purple",
    };
    const { color, ...rest } = purpleCuteSlime;
    const { attribute, ...re } = rest;
    if (ref) {
      console.log((ref as MutableRefObject<HTMLDivElement>).current);
    }
  }, []);

  function handleClick() {
    const value = { a: 1 };
    const truthy = value;
    console.log(!!truthy);
  }

  return (
    <>
      <div ref={ref}></div>
    </>
  );
});

const DataSource = "Hi";

withWapper(Hello, (DataSource) => console.log(DataSource));

function withWapper(Component: typeof Hello, func: (DataSource: string) => void) {
  func(DataSource);

  return <Component />;
}

export function Modal({ children }: { children: React.ReactNode }) {
  const el = document.getElementById("modal")!;
  return ReactDOM.createPortal(children, el);
}
