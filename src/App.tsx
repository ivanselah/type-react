import React, { createElement, SetStateAction, useContext, useEffect, useRef } from "react";
import { ReactNode } from "react";
import styled from "styled-components";
import FAIcon, { Hello, Modal, Test1 } from "./FAIcon";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  EventInfoProvider,
  ImageSlider,
  MainContainer,
  MapInfoContext,
  MapInfoProvider,
  TileEffectInputProvider,
} from "./MapInfo";

// const AppProvider = ({ contexts, children }) =>
//   contexts.reduce(
//     (prev, context) =>
//       createElement(context, {
//         children: prev,
//       }),
//     children,
//   );

type ContextsProvider = typeof MapInfoProvider | typeof EventInfoProvider;

const AppProvider = ({ contexts, children }: { contexts: ContextsProvider[]; children: ReactNode }) => {
  return (
    <>
      {contexts.reduce(
        //
        (pre, context) =>
          createElement(context, {
            children: pre,
          }),
        children
      )}
    </>
  );
};

// ContextAPI Mutl Provider Reverse (because of reduce)
// => 제일 상위 TileEffectInputProvider > EventInfoProvider > MapInfoProvider
// reduce // =>
function App() {
  const btnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("useEffect");
  }, []);

  return (
    <AppContainter>
      <Hello />
      <AppProvider
        contexts={[
          //
          MapInfoProvider,
          EventInfoProvider,
          TileEffectInputProvider,
        ]}
      >
        <MainContainer />
        <a href="/">
          <FAIcon icon={faTrash} size="lg" />
        </a>
        <Hello ref={btnRef} />
        <Modal>
          <h1>Hello</h1>
        </Modal>
        <Section />
      </AppProvider>
      <ImageSlider>
        <h1>1</h1>
      </ImageSlider>
    </AppContainter>
  );
}

export default App;

const AppContainter = styled.div``;

const Section = styled.div``;
