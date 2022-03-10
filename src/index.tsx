import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AppComponent from './AppComponent';
import HookTest from './hookTest';

ReactDOM.render(
  <React.StrictMode>
    <AppComponent />
    <HookTest />
  </React.StrictMode>,
  document.getElementById('root')
);
