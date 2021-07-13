import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './client/components/App';
import LandingPage from './client/components/LandingPage';
import { store } from './client/state/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <LandingPage />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
