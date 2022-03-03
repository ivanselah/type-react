import React, { useEffect, useContext, Children, cloneElement, ReactElement } from "react";
import ReactDOM from "react-dom";
import { createContext, useState } from "react";
import styled from "styled-components";

export interface MapInfoProps {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MapInfoContext = createContext({} as MapInfoProps);

export const MapInfoProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [isVisible, setIsVisible] = useState(false);
  console.log(children);
  return (
    <MapInfoContext.Provider
      value={{
        isVisible,
        setIsVisible,
      }}
    >
      {children}
    </MapInfoContext.Provider>
  );
};

export interface EventInfoProps {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}

export const EventInfoContext = createContext({} as EventInfoProps);

export const EventInfoProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [count, setCount] = useState(0);
  console.log(children);
  return (
    <EventInfoContext.Provider
      value={{
        count,
        setCount,
      }}
    >
      {children}
    </EventInfoContext.Provider>
  );
};

export interface TileEffectInputProps {
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}

export const TileEffectInputContext = createContext({} as TileEffectInputProps);

export const TileEffectInputProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [category, setCategory] = useState("");

  return (
    <TileEffectInputContext.Provider
      value={{
        category,
        setCategory,
      }}
    >
      {children}
    </TileEffectInputContext.Provider>
  );
};

export const MainContainer = () => {
  const props = useContext(MapInfoContext);
  console.log(props);
  return <h1>.</h1>;
};

interface Childrenren {
  children: ReactElement;
}

export function ImageSlider({ children }: Childrenren) {
  return (
    <div>
      {Children.map(children, (child) => {
        return cloneElement(child, { className: "super" });
      })}
    </div>
  );
}
