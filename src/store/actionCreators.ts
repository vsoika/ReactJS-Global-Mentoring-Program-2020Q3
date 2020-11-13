import axios from "axios";
import { Dispatch } from "redux";
import { MOVIES_DATA_URL } from "../constants";
import { ACTIONS, REQUEST_STATE } from "./actionTypes";

export const getFilteredMovies = () => ({
  type: ACTIONS.GET_FILTERED_MOVIES,
});

export const fetchMovies = (searchMovie = null) => {
  return (dispatch: Dispatch) => {
    dispatch({ type: `${ACTIONS.FETCH_MOVIES}${REQUEST_STATE.PENDING}` });
    return axios
      .get(MOVIES_DATA_URL)
      .then((response) => {
        const movies = response.data.data;
        dispatch({
          type: `${ACTIONS.FETCH_MOVIES}${REQUEST_STATE.SUCCESS}`,
          payload: movies,
        });
        dispatch(getFilteredMovies());

        if (searchMovie) {
          dispatch(getMoviesBySearchInput(searchMovie));
        }
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
    return axios
      .get(`${MOVIES_DATA_URL}/${id}`)
      .then((response) => {
        dispatch({
          type: `${ACTIONS.FETCH_MOVIES_BY_ID}${REQUEST_STATE.SUCCESS}`,
          payload: response.data,
        });
        dispatch(getFilteredMovies());
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

export const addMovie = (newMovie) => async (dispatch) => {
  try {
    const response = await axios.post(MOVIES_DATA_URL, newMovie);
    dispatch({
      type: ACTIONS.ADD_MOVIE,
      payload: { newMovie: response.data },
    });
    dispatch(getFilteredMovies());
  } catch (err) {
    console.warn("Movie has not been added", err);
  }
};

export const updateMovie = (updatedMovie) => async (dispatch) => {
  try {
    const response = await axios.put(MOVIES_DATA_URL, updatedMovie);
    dispatch({
      type: ACTIONS.UPDATE_MOVIE,
      payload: { updatedMovie: response.data },
    });

    dispatch(getFilteredMovies());
  } catch (err) {
    console.warn("Movie has not been updated", err);
  }
};

export const deleteMovie = (movieId) => async (dispatch) => {
  try {
    await axios.delete(`${MOVIES_DATA_URL}/${movieId}`);

    dispatch({
      type: ACTIONS.DELETE_MOVIE,
      payload: { movieId },
    });

    dispatch(getFilteredMovies());
  } catch (err) {
    console.warn("Movie has not been deleted", err);
  }
};

export const getMoviesBySearchInput = (searchValue) => ({
  type: ACTIONS.GET_MOVIES_BY_SEARCH_INPUT,
  payload: { searchValue },
});
