import { ACTIONS, REQUEST_STATE } from "../actionTypes";

const initialState = {
  movieById: {},
  fulfilledById: false,
  isError: false,
};

const search = (state = initialState, action: { type: string; payload }) => {
  const { type, payload } = action;

  switch (type) {
    case `${ACTIONS.FETCH_MOVIES_BY_ID}${REQUEST_STATE.PENDING}`:
      return {
        ...state,
        fulfilledById: false,
      };
    case `${ACTIONS.FETCH_MOVIES_BY_ID}${REQUEST_STATE.SUCCESS}`:
      return {
        ...state,
        movieById: payload,
        fulfilledById: true,
      };

    case `${ACTIONS.FETCH_MOVIES_BY_ID}${REQUEST_STATE.ERROR}`:
      return {
        ...state,
        fulfilledById: true,
        isError: true,
      };

    default:
      return state;
  }
};

export default search;
