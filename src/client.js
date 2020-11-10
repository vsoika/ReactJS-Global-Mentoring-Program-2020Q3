import '@babel/polyfill';
import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./store/reducers";
import { BrowserRouter } from "react-router-dom";
import Router from "./components/Router";

import "bootstrap/dist/css/bootstrap.min.css";

const store = createStore(rootReducer, { ...window.APP_STATE });
const app = (
  <BrowserRouter>
    <Provider store={store}>
      <Router />
    </Provider>
  </BrowserRouter>
);

if (!document.getElementById("root").childNodes.length) {
  ReactDOM.render(app, document.getElementById("root"));
} else {
  ReactDOM.hydrate(app, document.getElementById("root"));
}
