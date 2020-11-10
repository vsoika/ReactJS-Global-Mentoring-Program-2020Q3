import React from "react";
import { render, screen, act, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import selectEvent from "react-select-event";
import AddMovie from "../components/AddMovie";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

const initialState = {};
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
let store = mockStore(initialState);

const onHide = jest.fn();
const mockedHandleSuccessSubmit = jest.fn();

describe("Test suits for AddMovie", () => {
  it("renders AddMovie component", () => {
    const { getByText } = render(
      <Provider store={store}>
        <AddMovie
          show={true}
          isSuccessSubmit={false}
          onHide={onHide}
          handleSuccessSubmit={mockedHandleSuccessSubmit}
        />
      </Provider>
    );

    expect(getByText(/add movie/i)).toBeInTheDocument();
  });

  it("render all form inputs", () => {
    const { getByLabelText, getByText } = render(
      <Provider store={store}>
        <AddMovie
          show={true}
          isSuccessSubmit={false}
          onHide={onHide}
          handleSuccessSubmit={mockedHandleSuccessSubmit}
        />
      </Provider>
    );

    expect(getByLabelText(/title/i)).toBeInTheDocument();
    expect(getByLabelText(/movie image url/i)).toBeInTheDocument();
    expect(getByLabelText(/release date/i)).toBeInTheDocument();
    expect(getByLabelText(/overview/i)).toBeInTheDocument();
    expect(getByLabelText(/rating/i)).toBeInTheDocument();
    expect(getByLabelText(/runtime/i)).toBeInTheDocument();
    expect(getByText(/genre/i)).toBeInTheDocument();
  });

  it("render submit and reset buttons", () => {
    const { getByRole } = render(
      <Provider store={store}>
        <AddMovie
          show={true}
          isSuccessSubmit={false}
          onHide={onHide}
          handleSuccessSubmit={mockedHandleSuccessSubmit}
        />
      </Provider>
    );

    expect(getByRole("button", { name: /submit/i })).toBeInTheDocument();
    expect(getByRole("button", { name: /reset/i })).toBeInTheDocument();
  });

  it("validate title input and provide error message", async () => {
    const { getByTestId, getByText } = render(
      <Provider store={store}>
        <AddMovie
          show={true}
          isSuccessSubmit={false}
          onHide={onHide}
          handleSuccessSubmit={mockedHandleSuccessSubmit}
        />
      </Provider>
    );

    await act(async () => {
      userEvent.type(screen.getByLabelText(/title/i), "");
    });

    await act(async () => {
      userEvent.click(getByTestId("submit-button"));
    });

    expect(getByText("title is a required field")).toBeInTheDocument();
  });

  it("should submit form when form fields are filled correctly", async () => {
    const { getByTestId, getByLabelText } = await render(
      <Provider store={store}>
        <AddMovie
          show={true}
          isSuccessSubmit={false}
          onHide={onHide}
          handleSuccessSubmit={mockedHandleSuccessSubmit}
        />
      </Provider>
    );

    await act(async () => {
      userEvent.type(getByLabelText(/title/i), "X-Man");
      fireEvent.change(getByLabelText(/movie image url/i), {
        target: {
          value:
            "https://image.tmdb.org/t/p/w500/5vHssUeVe25bMrof1HyaPyWgaP.jpg",
        },
      });
      userEvent.type(getByLabelText(/release date/i), "2014-10-22");
      userEvent.type(getByLabelText(/overview/i), "Description");
      userEvent.type(getByLabelText(/rating/i), "10");
      userEvent.type(getByLabelText(/runtime/i), "90");
      await selectEvent.select(getByLabelText("Genre"), ["Comedy", "Action"]);
    });

    await act(async () => {
      userEvent.click(getByTestId("submit-button"));
    });

    expect(mockedHandleSuccessSubmit).toBeCalledTimes(1);
  });
});
