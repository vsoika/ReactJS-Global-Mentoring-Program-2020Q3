import { ACTIONS, REQUEST_STATE } from "../actionTypes";
import { SORT_OPTIONS, GENRE_OPTIONS } from "../../constants";

const initialState = {
  moviesList: [],
  pending: null,
  filteredMoviesList: [],
  sortOption: SORT_OPTIONS.release,
  selectedGenre: GENRE_OPTIONS.all,
};

const movies = (state = initialState, action: { type: string; payload }) => {
  const { type, payload } = action;

  const sortByOption = (sortOption: string) => {
    return (a, b) => (a[sortOption] < b[sortOption] ? 1 : -1);
  };

  console.log(action);

  switch (type) {
    case `${ACTIONS.FETCH_MOVIES}${REQUEST_STATE.PENDING}`:
      return {
        ...state,
        pending: true,
      };
    case `${ACTIONS.FETCH_MOVIES}${REQUEST_STATE.SUCCESS}`:
      return {
        ...state,
        moviesList: payload,
        pending: false,
      };

    case `${ACTIONS.FETCH_MOVIES}${REQUEST_STATE.ERROR}`:
      return {
        ...state,
        pending: false,
      };

    case ACTIONS.SET_SORT_OPTION:
      return { ...state, sortOption: payload.option };

    case ACTIONS.SET_GENRE:
      return { ...state, selectedGenre: payload.genre };

    case ACTIONS.GET_FILTERED_MOVIES:
      const genre = state.selectedGenre;
      const sortOption = state.sortOption;
      const moviesList = state.moviesList;

      const filteredList = genre !== GENRE_OPTIONS.all
        ? moviesList.filter((movie) =>
            movie.genres.includes(genre)
          )
        : moviesList;

        sortOption === SORT_OPTIONS.duration
          ? filteredList.sort(sortByOption("runtime"))
          : sortOption === SORT_OPTIONS.rating
          ? filteredList.sort(sortByOption("vote_average"))
          : filteredList.sort(sortByOption("release_date"));

        return { ...state, filteredMoviesList: filteredList };

    default:
      return state;
  }
};

export default movies;