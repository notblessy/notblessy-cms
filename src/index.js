import React from 'react';
import ReactDOM from 'react-dom';
import { SWRConfig } from 'swr';
import { CookiesProvider } from 'react-cookie';

import App from './App';
import { fetcher } from './libs/utils/api';
import reportWebVitals from './reportWebVitals';

import { Helmet } from './components';

import './assets/app.css';

const Container = () => {
  return (
    <CookiesProvider>
      <SWRConfig
        value={{
          refreshInterval: 0,
          fetcher,
        }}
      >
        <App />
      </SWRConfig>
    </CookiesProvider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Helmet />
    <Container />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
