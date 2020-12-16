/* eslint-disable no-case-declarations */
import { ACTIONS, REQUEST_STATE } from "../actionTypes";
import { SORT_OPTIONS, GENRE_OPTIONS } from "../../constants";

const initialState = {
  moviesList: [],
  fulfilled: false,
  filteredMoviesList: [],
  isFiltered: false,
  sortOption: SORT_OPTIONS.release,
  selectedGenre: GENRE_OPTIONS.all,
};

const movies = (state = initialState, action: { type: string; payload? }) => {
  const { type, payload } = action;

  const sortByOption = (sortOption: string) => {
    return (a, b) => (a[sortOption] < b[sortOption] ? 1 : -1);
  };

  switch (type) {
    case ACTIONS.PUSH_MOVIES_TO_STORE:
      return { ...state, moviesList: payload.movies };

    case ACTIONS.SET_SORT_OPTION:
      return { ...state, sortOption: payload.option };

    case ACTIONS.SET_GENRE:
      return { ...state, selectedGenre: payload.genre };

    case ACTIONS.GET_FILTERED_MOVIES:
      const genre = state.selectedGenre;
      const sortOption = state.sortOption;
      const moviesList = state.moviesList;

      const filteredList =
        genre !== GENRE_OPTIONS.all
          ? moviesList.filter((movie) => {
              return movie.genres.some((item) => {
                return item === genre;
              });
            })
          : moviesList;

      sortOption === SORT_OPTIONS.duration
        ? filteredList.sort(sortByOption("runtime"))
        : sortOption === SORT_OPTIONS.rating
        ? filteredList.sort(sortByOption("vote_average"))
        : filteredList.sort(sortByOption("release_date"));

      return { ...state, filteredMoviesList: filteredList, isFiltered: true };

    case ACTIONS.ADD_MOVIE:
      return { ...state, moviesList: [...state.moviesList, payload.newMovie] };

    case ACTIONS.UPDATE_MOVIE:
      const { updatedMovie } = payload;
      const movies = state.moviesList;
      const updatedMoviesList = movies.map((movie) => {
        if (movie.id === updatedMovie.id) {
          movie = updatedMovie;
        }
        return movie;
      });

      return { ...state, moviesList: updatedMoviesList };

    case ACTIONS.DELETE_MOVIE:
      const newMoviesList = state.moviesList.filter(
        (movie) => movie.id !== payload.movieId
      );
      return { ...state, moviesList: newMoviesList };

    case ACTIONS.GET_MOVIES_BY_SEARCH_INPUT:
      const allMovies = state.filteredMoviesList;
      const { searchValue } = payload;

      const searchMovies = allMovies.filter((movie) => {
        const searchMovie = searchValue.toLowerCase();
        return movie.title.trim().toLowerCase().includes(searchMovie);
      });

      return { ...state, filteredMoviesList: searchMovies, isFiltered: true };

    default:
      return state;
  }
};

export default movies;
