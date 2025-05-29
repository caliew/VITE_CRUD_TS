import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import { enableConsoleLoggingForAllowedEnvironments } from "@shared/utils/console";
import { initializeAxiosInterceptor } from "@shared/utils/api/interceptor";

import { ROOT_PATH } from "@shared/constants/paths";
import { store } from "@stores/store";
// import store from './redux/store.ts';
import "./index.css";
import "./i18n";

// --------------
// INITIALIZATION
// --------------
enableConsoleLoggingForAllowedEnvironments();
initializeAxiosInterceptor();
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename={ROOT_PATH}>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
