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
        const movies = response.data.data;
        dispatch({
          type: `${ACTIONS.FETCH_MOVIES}${REQUEST_STATE.SUCCESS}`,
          payload: movies,
        });
      })
      .catch((err) => {
        console.warn("Server doesn't response", err);
        dispatch({
          type: `${ACTIONS.FETCH_MOVIES}${REQUEST_STATE.ERROR}`,
        });
      });
  };
};

export const fetchMoviesById = (id) => {
  return (dispatch: Dispatch) => {
    dispatch({ type: `${ACTIONS.FETCH_MOVIES_BY_ID}${REQUEST_STATE.PENDING}` });
    axios
      .get(`${MOVIES_DATA_URL}/${id}`)
      .then((response) => {
        dispatch({
          type: `${ACTIONS.FETCH_MOVIES_BY_ID}${REQUEST_STATE.SUCCESS}`,
          payload: response.data,
        });
      })
      .catch((err) => {
        console.warn("Server doesn't response", err);
        dispatch({
          type: `${ACTIONS.FETCH_MOVIES_BY_ID}${REQUEST_STATE.ERROR}`,
        });
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
  type: ACTIONS.GET_FILTERED_MOVIES,
});

export const addMovie = (newMovie) => ({
  type: ACTIONS.ADD_MOVIE,
  payload: { newMovie },
});

export const updateMovie = (updatedMovie) => ({
  type: ACTIONS.UPDATE_MOVIE,
  payload: { updatedMovie },
});

export const deleteMovie = (movieId) => ({
  type: ACTIONS.DELETE_MOVIE,
  payload: { movieId },
});

export const getMoviesBySearchInput = (searchValue) => ({
  type: ACTIONS.GET_MOVIES_BY_SEARCH_INPUT,
  payload: { searchValue },
});
