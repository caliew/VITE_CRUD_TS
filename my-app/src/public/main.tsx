import React from 'react';
import ReactDOM from 'react-dom';
import App from '../app/App.tsx'
import { Provider } from 'react-redux';
import store from '../redux/store.ts';

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);