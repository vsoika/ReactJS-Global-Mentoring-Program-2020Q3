import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

export default (initialState) => {
  const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

  return store;
};

// function saveToLocalStorage(state) {
//   try {
//     const lastState = JSON.stringify(state);
//     localStorage.setItem("state", lastState);
//   } catch (e) {
//     console.warn(e);
//   }
// }

// function loadFromLocalStorage() {
//   try {
//     const lastState = localStorage.getItem("state");
//     return lastState ? JSON.parse(lastState) : undefined;
//   } catch (e) {
//     console.warn(e);
//     return undefined;
//   }
// }

// const previousState = loadFromLocalStorage();

// store.subscribe(() => saveToLocalStorage(store.getState()));

// export default store;
