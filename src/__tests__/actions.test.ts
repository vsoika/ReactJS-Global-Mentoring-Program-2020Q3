import * as actions from "../store/actionCreators";
import * as types from "../store/actionTypes";
import { SORT_OPTIONS, GENRE_OPTIONS } from "../constants";

describe("Actions", () => {
  it("should create an action to set sort option", () => {
    const text = SORT_OPTIONS.duration;
    const expectedAction = {
      type: types.ACTIONS.SET_SORT_OPTION,
      payload: {
        option: text,
      },
    };
    expect(actions.setSortOption(text)).toEqual(expectedAction);
  });

  it("should create an action to set genre", () => {
    const text = GENRE_OPTIONS.comedy;
    const expectedAction = {
      type: types.ACTIONS.SET_GENRE,
      payload: {
        genre: text,
      },
    };
    expect(actions.setGenre(text)).toEqual(expectedAction);
  });
});
