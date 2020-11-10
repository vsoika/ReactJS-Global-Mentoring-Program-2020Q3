const React = require("react");
const ReactDOMServer = require("react-dom/server");
const createStore = require("./store").default;
const { Provider } = require("react-redux");
const rootReducer = require("./store/reducers").default;
const { StaticRouter } = require("react-router");
const Html = require("./html").default;
const Router = require("./components/Router").default;

module.exports = function (app) {
  app.get("*", async (req, res) => {
    const scripts = ["vendor.js", "client.js"];

    const initialState = { initialText: "rendered on the server" };

    const store = createStore(rootReducer, initialState);

    const appMarkup = ReactDOMServer.renderToString(
      <StaticRouter location={req.url} context={{}}>
        <Provider store={store}>
          <Router />
        </Provider>
      </StaticRouter>
    );

    const html = ReactDOMServer.renderToStaticMarkup(
      <Html
        children={appMarkup}
        scripts={scripts}
        initialState={initialState}
      />
    );

    res.send(`<!doctype html>${html}`);
  });
};
