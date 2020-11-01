import { ACTIONS, REQUEST_STATE } from "../store/actionTypes";
import { SORT_OPTIONS, GENRE_OPTIONS } from "../constants";
import movies from "../store/reducers/movies";

const state = {
  moviesList: [{ id: 335984, title: "Blade Runner 2049" }],
  fulfilled: false,
  filteredMoviesList: [],
  isFiltered: false,
  sortOption: SORT_OPTIONS.release,
  selectedGenre: GENRE_OPTIONS.all,
};

const initialState = {
  moviesList: [],
  fulfilled: false,
  filteredMoviesList: [],
  isFiltered: false,
  sortOption: SORT_OPTIONS.release,
  selectedGenre: GENRE_OPTIONS.all,
};

describe("Movies reducer", () => {
  it("should return the initial state", () => {
    return expect(movies(undefined, { type: "GET_STATE" })).toEqual(
      initialState
    );
  });

  it("should handle ADD_MOVIE", () => {
    const newMovie = {
      id: 335984,
      title: "Blade Runner 2049",
      vote_average: 7.3,
      vote_count: 3955,
    };

    expect(
      movies(undefined, {
        type: ACTIONS.ADD_MOVIE,
        payload: { newMovie: newMovie },
      })
    ).toEqual({
      ...initialState,
      moviesList: [newMovie],
    });
  });

  it("should handle UPDATE_MOVIE", () => {
    const updatedMovie = { id: 335984, title: "Blade", vote_average: 7.3 };

    expect(
      movies(state, {
        type: ACTIONS.UPDATE_MOVIE,
        payload: { updatedMovie: updatedMovie },
      })
    ).toEqual({
      ...state,
      moviesList: [{ id: 335984, title: "Blade", vote_average: 7.3 }],
    });
  });

  it("should handle DELETE_MOVIE", () => {
    const id = 335984;

    expect(
      movies(state, {
        type: ACTIONS.DELETE_MOVIE,
        payload: { movieId: id },
      })
    ).toEqual(initialState);
  });

  it("should handle GET_MOVIES_BY_SEARCH_INPUT", () => {
    const state = {
      moviesList: [],
      fulfilled: false,
      filteredMoviesList: [
        { id: 335984, title: "Blade" },
        { id: 339875, title: "Old Man" },
      ],
      isFiltered: false,
      sortOption: SORT_OPTIONS.release,
      selectedGenre: GENRE_OPTIONS.all,
    };
    const searchValue = "man";

    expect(
      movies(state, {
        type: ACTIONS.GET_MOVIES_BY_SEARCH_INPUT,
        payload: { searchValue: searchValue },
      })
    ).toEqual({
      ...state,
      filteredMoviesList: [{ id: 339875, title: "Old Man" }],
      isFiltered: true,
    });
  });

  it("should handle GET_FILTERED_MOVIES", () => {
    const state = {
      moviesList: [
        { id: 335984, title: "Blade", genres: ["Action"] },
        {
          id: 245891,
          title: "John Wick",
          release_date: "2014-10-22",
          genres: ["Comedy", "Thriller"],
        },
      ],
      fulfilled: false,
      filteredMoviesList: [],
      isFiltered: false,
      sortOption: SORT_OPTIONS.release,
      selectedGenre: GENRE_OPTIONS.comedy,
    };

    expect(
      movies(state, {
        type: ACTIONS.GET_FILTERED_MOVIES,
      })
    ).toEqual({
      ...state,
      filteredMoviesList: [
        {
          id: 245891,
          title: "John Wick",
          release_date: "2014-10-22",
          genres: ["Comedy", "Thriller"],
        },
      ],
      isFiltered: true,
    });
  });

  it("should handle SET_GENRE", () => {
    const genre = GENRE_OPTIONS.documentary;
    expect(
      movies(undefined, {
        type: ACTIONS.SET_GENRE,
        payload: { genre: genre },
      })
    ).toEqual({
      ...initialState,
      selectedGenre: GENRE_OPTIONS.documentary,
    });
  });

  it("should handle SET_SORT_OPTION", () => {
    const sortOption = SORT_OPTIONS.rating;
    expect(
      movies(undefined, {
        type: ACTIONS.SET_SORT_OPTION,
        payload: { option: sortOption },
      })
    ).toEqual({
      ...initialState,
      sortOption: SORT_OPTIONS.rating,
    });
  });

  it("should handle FETCH_MOVIES PENDING", () => {
    expect(
      movies(undefined, {
        type: `${ACTIONS.FETCH_MOVIES}${REQUEST_STATE.PENDING}`,
        payload: state.moviesList,
      })
    ).toEqual(initialState);
  });

  it("should handle FETCH_MOVIES SUCCESS", () => {
    expect(
      movies(undefined, {
        type: `${ACTIONS.FETCH_MOVIES}${REQUEST_STATE.SUCCESS}`,
        payload: state.moviesList,
      })
    ).toEqual({ ...state, fulfilled: true });
  });

  it("should handle FETCH_MOVIES ERROR", () => {
    expect(
      movies(undefined, {
        type: `${ACTIONS.FETCH_MOVIES}${REQUEST_STATE.ERROR}`,
        payload: state.moviesList,
      })
    ).toEqual(initialState);
  });
});
