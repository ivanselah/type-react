import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AppComponent from './AppComponent';
import HookTest from './hookTest';
import API from './lecture/API';
import Main from './lecture/Main';
import PromiseT from './lecture/PromisT';
import LifeCycle from './Lifecycle';
import AppCom from './project-1/AppCom';
import GlobalStyle from './styles';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <AppCom />
  </React.StrictMode>,
  document.getElementById('root')
);
