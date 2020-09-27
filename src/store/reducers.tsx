import { ACTIONS, REQUEST_STATE } from "./actionTypes";

const initialState = {
  moviesList: [],
  pending: null,
};

export default function (
  state = initialState,
  action: { type: string; payload: [] }
) {
  const { type, payload } = action;

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

    default:
      return state;
  }
}
