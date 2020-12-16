import { ACTIONS } from "../actionTypes";

const initialState = {
  movieById: {},
  fulfilledById: false,
  isError: false,
};

const search = (state = initialState, action: { type: string; payload }) => {
  const { type, payload } = action;

  switch (type) {
    case ACTIONS.PUSH_MOVIE_BY_ID:
      return {
        ...state,
        movieById: payload.movie,
        fulfilledById: true,
      };

    default:
      return state;
  }
};

export default search;
