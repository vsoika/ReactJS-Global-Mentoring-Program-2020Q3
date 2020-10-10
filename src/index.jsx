import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import App from "./components/App.tsx";
import NoMatch from "./components/404page";
import ErrorBoundary from "./components/ErrorBoundary";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/">
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </Route>
        <Route path="/404" component={NoMatch} />
        <Route path="*">
          <Redirect to="/404" />
        </Route>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
