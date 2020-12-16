import axios from "axios";
import { MOVIES_DATA_URL } from "../constants";
import { ACTIONS } from "./actionTypes";

export const pushMoviesToStore = (movies) => ({
  type: ACTIONS.PUSH_MOVIES_TO_STORE,
  payload: { movies },
})

export const pushMovieById = (movie) =>  ({
  type: ACTIONS.PUSH_MOVIE_BY_ID,
  payload: { movie },
})

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

export const addMovie = (newMovie) => async (dispatch) => {
  try {
    const response = await axios.post(MOVIES_DATA_URL, newMovie);
    console.log(response)
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
    const response = await axios.delete(`${MOVIES_DATA_URL}/${movieId}`);
    console.log(response)
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
