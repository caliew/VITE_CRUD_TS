import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.tsx'
import { ErrorBoundary } from './components';
import { Provider } from 'react-redux';
import store from './redux/store.ts';
import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);