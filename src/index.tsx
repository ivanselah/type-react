import React from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";
import App from "./App";
import AppComponent from "./AppComponent";
import HookTest from "./hookTest";
import API from "./other/lecture/API";
import Main from "./other/lecture/Main";
import PromiseT from "./other/lecture/PromisT";
import LifeCycle from "./Lifecycle";
import AppCom from "./other/project-1/AppCom";
import GlobalStyle from "./styles";
import { createStore } from "redux";
import MainComponent from "./project01/MainComponent";
import rootReducer from "./project01/modules/rootReducer";
import { Provider } from "react-redux";

const store = createStore(rootReducer);

console.log(store.getState());

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <RecoilRoot>
      <Provider store={store}>
        <MainComponent />
      </Provider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);
