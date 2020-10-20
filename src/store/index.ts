import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

function saveToLocalStorage(state) {
  try {
    const lastState = JSON.stringify(state);
    localStorage.setItem("state", lastState);
  } catch (e) {
    console.warn(e);
  }
}

function loadFromLocalStorage() {
  try {
    const lastState = localStorage.getItem("state");
    return lastState ? JSON.parse(lastState) : undefined;
  } catch (e) {
    console.warn(e);
    return undefined;
  }
}

const previousState = loadFromLocalStorage();

const store = createStore(
  rootReducer,
  previousState,
  composeWithDevTools(applyMiddleware(thunk))
);

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;
