import React from "react";
import { Provider } from "react-redux";
import App from "./App";
import NoMatch from "./404page";
import MovieDetailsContainer from "./MovieDetailsContainer";
import ErrorBoundary from "./ErrorBoundary";
import NoMovieFound from "./NoMovieFound";
import { Route, Switch, Redirect } from "react-router-dom";
import { hot } from "react-hot-loader";

const Router = ({ Router, location, context, store }) => {
  return (
    <Provider store={store}>
      <Router location={location} context={context}>
        <Switch>
          <Route exact path="/">
            <ErrorBoundary>
              <App.component />
            </ErrorBoundary>
          </Route>
          <Route
            exact
            path="/film/:id"
            component={MovieDetailsContainer.component}
          />
          <Route exact path="/search/:value" component={App.component} />
          <Route exact path="/no-movie-found" component={NoMovieFound} />
          <Route path="/404" component={NoMatch} />
          <Route path="*">
            <Redirect to="/404" />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
};

export default hot(module)(Router);
