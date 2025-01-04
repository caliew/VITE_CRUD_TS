import { OidcProvider } from '@axa-fr/react-oidc';
import { Spin } from 'antd';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App'

import { AUTH_CONFIG } from '@shared/configs/authentication';
import { enableConsoleLoggingForAllowedEnvironments } from '@shared/utils/console';
import { initializeAxiosInterceptor } from '@shared/utils/api/interceptor';

import { ROOT_PATH } from '@shared/constants/paths';
import { persistor, store } from '@stores/store';
// import store from './redux/store.ts';
import './index.css';
import './i18n';

// --------------
// INITIALIZATION
// --------------
enableConsoleLoggingForAllowedEnvironments();
initializeAxiosInterceptor();

ReactDOM.render(
  <React.StrictMode>
    <OidcProvider {...AUTH_CONFIG}>
      <Provider store={store}>
        <BrowserRouter basename={ROOT_PATH}>
          <App />
        </BrowserRouter>
      </Provider>
    </OidcProvider>
  </React.StrictMode>,
  document.getElementById('root')
);