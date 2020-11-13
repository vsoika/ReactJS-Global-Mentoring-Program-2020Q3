import React from "react";
import { renderToString } from "react-dom/server";
import { matchRoutes } from "react-router-config";
import { StaticRouter } from "react-router-dom";
import Router from "./components/Router";
import configupromisetore from "./store/index";
import Routes from "./Routes";

function renderHTML(html, preloadedState) {
  return `
      <!doctype html>
      <html>
        <head>
          <meta charset=utf-8>
          <title>Movies SSR</title>
          ${
            process.env.NODE_ENV === "development"
              ? ""
              : '<link href="/css/main.css" rel="stylesheet" type="text/css">'
          }
          <link rel="stylesheet" type="text/css" href="./style.css" />
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" 
integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" 
crossorigin="anonymous">
        </head>
        <body>
          <div id="root">${html}</div>
          <script>
            // WARNING: See the following for security issues around embedding JSON in HTML:
            // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
            window.PRELOADED_STATE = ${JSON.stringify(preloadedState).replace(
              /</g,
              "\\u003c"
            )}
          </script>
          <script src="/js/main.js"></script>
        </body>
      </html>
  `;
}

function getPromises(store, requestPath) {
  const { dispatch } = store;
  const routes = matchRoutes(Routes, requestPath);

  const promises = routes.map(({ route }) => {
    const isContainMovieId = requestPath.includes("film");
    let id;
    let searchMovie;

    if (requestPath.includes("search")) {
      searchMovie = requestPath.split("=")[1];
    }

    if (isContainMovieId) {
      id = requestPath.slice(6);
    }

    if (requestPath.includes("css")) return;

    let promise = route.loadData
      ? isContainMovieId
        ? route.loadData(dispatch, id)
        : route.loadData(dispatch)
      : null;

    if (requestPath.includes("search")) {
      promise = route.loadData(dispatch, searchMovie);
    }

    return promise;
  });

  return promises;
}

export default function serverRenderer() {
  return (req, res) => {
    const store = configupromisetore();
    const promises = getPromises(store, req.path);

    Promise.all(promises)
      .then(() => {
        const context = {};

        const renderRoot = () => (
          <Router
            context={context}
            location={req.url}
            Router={StaticRouter}
            store={store}
          />
        );

        renderToString(renderRoot());

        // context.url will contain the URL to redirect to if a <Redirect> was used
        if (context.url) {
          res.writeHead(302, {
            Location: context.url,
          });
          res.end();
          return;
        }

        const htmlString = renderToString(renderRoot());
        const preloadedState = store.getState();

        res.send(renderHTML(htmlString, preloadedState));
      })
      .catch((e) => console.error(e));
  };
}
