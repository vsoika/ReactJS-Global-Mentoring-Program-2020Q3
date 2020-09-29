import axios from "axios";
import { Dispatch } from "redux";
import { MOVIES_DATA_URL } from "../constants";
import { ACTIONS, REQUEST_STATE } from "./actionTypes";

export const fetchMovies = () => {
  return (dispatch: Dispatch) => {
    dispatch({ type: `${ACTIONS.FETCH_MOVIES}${REQUEST_STATE.PENDING}` });
    axios
      .get(MOVIES_DATA_URL)
      .then((response) => {
        console.log("fetchMovies", response);
        const movies = response.data.data;
        dispatch({
          type: `${ACTIONS.FETCH_MOVIES}${REQUEST_STATE.SUCCESS}`,
          payload: movies,
        });
      })
      .catch((err) => {
        console.error("Server doesn't response", err);
        dispatch({ type: `${ACTIONS.FETCH_MOVIES}${REQUEST_STATE.ERROR}` });
      });
  };
};

export const setSortOption = (option) => ({
  type: ACTIONS.SET_SORT_OPTION,
  payload: { option },
});

export const setGenre = (genre) => ({
    type: ACTIONS.SET_GENRE,
    payload: { genre },
  });

export const getFilteredMovies = () => ({
    type: ACTIONS.GET_FILTERED_MOVIES
});
