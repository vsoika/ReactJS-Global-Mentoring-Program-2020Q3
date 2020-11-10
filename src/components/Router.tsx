import React from "react";
import { Provider } from "react-redux";
import store from "../store";
import App from "./App";
import NoMatch from "./404page";
import MovieDetailsContainer from "./MovieDetailsContainer";
import ErrorBoundary from "./ErrorBoundary";
import NoMovieFound from "./NoMovieFound";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

const Router: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <ErrorBoundary>
              <App />
            </ErrorBoundary>
          </Route>
          <Route exact path="/film/:id" component={MovieDetailsContainer} />
          <Route exact path="/search/:value" component={App} />
          <Route exact path="/no-movie-found" component={NoMovieFound} />
          <Route path="/404" component={NoMatch} />
          <Route path="*">
            <Redirect to="/404" />
          </Route>
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default Router;
