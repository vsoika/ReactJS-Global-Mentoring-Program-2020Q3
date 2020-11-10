import * as actions from "../store/actionCreators";
import { ACTIONS, REQUEST_STATE } from "../store/actionTypes";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import { MOVIES_DATA_URL } from "../constants";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore();

describe("Async actions", () => {
  beforeEach(() => {
    store.clearActions();
  });

  it("expected FETCH_MOVIES action should be dispatched on successful request", () => {
    const expectedActions = [
      { type: `${ACTIONS.FETCH_MOVIES}${REQUEST_STATE.PENDING}` },
      {
        type: `${ACTIONS.FETCH_MOVIES}${REQUEST_STATE.SUCCESS}`,
        payload: [{ id: 335984, title: "Blade Runner 2049" }],
      },
    ];

    mock
      .onGet(MOVIES_DATA_URL)
      .reply(200, { data: [{ id: 335984, title: "Blade Runner 2049" }] });

    return store.dispatch(actions.fetchMovies()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("expected FETCH_MOVIES action should be dispatched on failed request", () => {
    const expectedActions = [
      { type: `${ACTIONS.FETCH_MOVIES}${REQUEST_STATE.PENDING}` },
      { type: `${ACTIONS.FETCH_MOVIES}${REQUEST_STATE.ERROR}` },
    ];

    mock.onGet(MOVIES_DATA_URL).reply(500);

    return store.dispatch(actions.fetchMovies()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("expected ADD_MOVIES action should be dispatched on successful request", () => {
    const expectedActions = [
      {
        type: ACTIONS.ADD_MOVIE,
        payload: { newMovie: { id: 335984, title: "Blade Runner 2049" } },
      },
      { type: ACTIONS.GET_FILTERED_MOVIES },
    ];

    mock
      .onPost(MOVIES_DATA_URL)
      .reply(201, { id: 335984, title: "Blade Runner 2049" });

    return store.dispatch(actions.addMovie({})).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("expected ADD_MOVIES action should be dispatched on failed request", () => {
    const expectedActions = [];

    mock
      .onPost(MOVIES_DATA_URL)
      .reply(404, { id: 335984, title: "Blade Runner 2049" });

    return store.dispatch(actions.addMovie({})).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("expected UPDATE_MOVIE action should be dispatched on successful request", () => {
    const expectedActions = [
      {
        type: ACTIONS.UPDATE_MOVIE,
        payload: { updatedMovie: { id: 335984, title: "Blade Runner 2049" } },
      },
      { type: ACTIONS.GET_FILTERED_MOVIES },
    ];

    mock
      .onPut(MOVIES_DATA_URL)
      .reply(200, { id: 335984, title: "Blade Runner 2049" });

    return store.dispatch(actions.updateMovie({})).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("expected UPDATE_MOVIE action should be dispatched on failed request", () => {
    const expectedActions = [];

    mock
      .onPut(MOVIES_DATA_URL)
      .reply(404, { id: 335984, title: "Blade Runner 2049" });

    return store.dispatch(actions.updateMovie({})).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });


  it("expected FETCH_MOVIES_BY_ID action should be dispatched on successful request", () => {
    const movieId = 335984;
    const expectedActions = [
      { type: `${ACTIONS.FETCH_MOVIES_BY_ID}${REQUEST_STATE.PENDING}` },
      {
        type: `${ACTIONS.FETCH_MOVIES_BY_ID}${REQUEST_STATE.SUCCESS}`,
        payload: [{ id: movieId, title: "Blade Runner 2049" }],
      },
    ];

    mock
      .onGet(`${MOVIES_DATA_URL}/${movieId}`)
      .reply(200, [{ id: movieId, title: "Blade Runner 2049" }]);

    return store.dispatch(actions.fetchMoviesById(movieId)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("expected FETCH_MOVIES_BY_ID action should be dispatched on failed request", () => {
    const movieId = 335984;
    const expectedActions = [
      { type: `${ACTIONS.FETCH_MOVIES_BY_ID}${REQUEST_STATE.PENDING}` },
      {
        type: `${ACTIONS.FETCH_MOVIES_BY_ID}${REQUEST_STATE.ERROR}`,
      },
    ];

    mock
      .onGet(`${MOVIES_DATA_URL}/${movieId}`)
      .reply(404, { id: 335984, title: "Blade Runner 2049" });

    return store.dispatch(actions.fetchMoviesById(movieId)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
