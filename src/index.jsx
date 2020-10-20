import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import App from "./components/App.tsx";
import NoMatch from "./components/404page";
import MovieDetailsContainer from './components/MovieDetailsContainer';
import ErrorBoundary from "./components/ErrorBoundary";
import NoMovieFound from './components/NoMovieFound';
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
        <Route exact path="/film/:id" component={MovieDetailsContainer}/>
        <Route exact path="/search/:value" component={App} />
        <Route exact path="/no-movie-found" component={NoMovieFound} />
        <Route path="/404" component={NoMatch} />
        <Route path="*">
          <Redirect to="/404" />
        </Route>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
