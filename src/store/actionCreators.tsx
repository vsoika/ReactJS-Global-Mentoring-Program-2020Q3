import axios from "axios";
import { Dispatch } from "redux";
import { MOVIES_DATA_URL } from "../constants";
import { ACTIONS, REQUEST_STATE } from "./actionTypes";

const fetchMovies = () => {
  return (dispatch: Dispatch) => {
    dispatch({ type: `${ACTIONS.FETCH_MOVIES}${REQUEST_STATE.PENDING}` });
    axios
      .get(MOVIES_DATA_URL)
      .then((response) => {
        console.log("fetchMovies", response);
        dispatch({
          type: `${ACTIONS.FETCH_MOVIES}${REQUEST_STATE.SUCCESS}`,
          payload: response.data.data,
        });
      })
      .catch((err) => {
        console.error("Server doesn't response", err);
        dispatch({ type: `${ACTIONS.FETCH_MOVIES}${REQUEST_STATE.ERROR}` });
      });
  };
};

export default fetchMovies;
