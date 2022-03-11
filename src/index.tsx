import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AppComponent from './AppComponent';
import HookTest from './hookTest';
import API from './lecture/API';
import Main from './lecture/Main';

ReactDOM.render(
  <React.StrictMode>
    <API />
  </React.StrictMode>,
  document.getElementById('root')
);
