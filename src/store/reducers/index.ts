import { combineReducers } from "redux";
import movies from "./movies";

const rootReducer = combineReducers({
  movies,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
