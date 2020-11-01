import React from "react";
import { render, screen } from "@testing-library/react";
import NoMovieFound from "../components/NoMovieFound";
import { BrowserRouter } from "react-router-dom";

describe("Test suits for NoMovieFound", () => {
  it("renders NoMovieFound component", () => {
    const tree = render(
      <BrowserRouter>
        <NoMovieFound />
      </BrowserRouter>
    );

    screen.debug();
    expect(tree).toMatchSnapshot();
  });
});
