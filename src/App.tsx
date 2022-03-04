import React, { createElement, FunctionComponent, SetStateAction, useContext, useEffect } from "react";
import { ReactFragment } from "react";
import { ReactNode } from "react";
import styled from "styled-components";
import {
  EventInfoProps,
  EventInfoProvider,
  ImageSlider,
  MainContainer,
  MapInfoContext,
  MapInfoProps,
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

const AppProv = () => {
  const { isVisible, setIsVisible }: { isVisible: boolean; setIsVisible: React.Dispatch<SetStateAction<boolean>> } =
    useContext(MapInfoContext);

  useEffect(() => {
    console.log(isVisible, setIsVisible);
  }, [isVisible, setIsVisible]);

  return <h1>.</h1>;
};
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
function App() {
  return (
    <AppContainter>
      <AppProvider
        contexts={[
          //
          MapInfoProvider,
          EventInfoProvider,
          TileEffectInputProvider,
        ]}
      >
        <MainContainer />
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

const temp = createElement(MapInfoProvider, { children: "Hello" });
