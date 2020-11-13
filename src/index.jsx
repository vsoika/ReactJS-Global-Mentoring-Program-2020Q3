import React from "react";
import { hydrate, render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Router from "./components/Router.tsx";
import configureStore from "./store/index";

// import "bootstrap/dist/css/bootstrap.css";

const store = configureStore(window.PRELOADED_STATE);
const app = <Router Router={BrowserRouter} store={store} />;
const renderMethod = module.hot ? render : hydrate;

renderMethod(app, document.getElementById("root"));
