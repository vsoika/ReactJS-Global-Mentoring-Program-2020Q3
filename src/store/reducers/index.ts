import { combineReducers } from "redux";
import movies from "./movies";
import search from "./search";

const rootReducer = combineReducers({
  movies,
  search,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
