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
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import CounterContainer from "./project01/containers/CounterContainer";
import rootReducer, { rootSaga } from "./project01/modules/rootReducer";
import TodosContainer from "./project01/containers/TodosContainer";
import PlaceholderContainer from "./project01/containers/PlaceholderContainer";
import logger from "redux-logger";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import { Home, SectionOne } from "./project01/home";
import CounterSagaContainer from "./project01/containers/CounterSagaContainer";
import ContextComponent from "./project01/contextApi/ContextComponent";

const sagaMiddleware = createSagaMiddleware();

const MIDDLEWARE = [thunk, sagaMiddleware, logger];

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...MIDDLEWARE)));
const queryClient = new QueryClient();
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <RecoilRoot>
      <BrowserRouter>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <CounterContainer />
            <TodosContainer />
            <CounterSagaContainer />
            <PlaceholderContainer />
            {/* <ContextComponent /> */}
            <ReactQueryDevtools initialIsOpen={true} />
            <Routes>
              <Route path='/' element={<SectionOne />} />
              <Route path='/:id' element={<Home />} />
            </Routes>
          </QueryClientProvider>
        </Provider>
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);
