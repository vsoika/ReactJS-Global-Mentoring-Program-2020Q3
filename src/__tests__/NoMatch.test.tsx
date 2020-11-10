import React from "react";
import { render, screen } from "@testing-library/react";
import NoMatch from "../components/404page/NoMatch";
import { BrowserRouter } from "react-router-dom";

describe("Test suits for NoMatch", () => {
  it.skip("renders NoMatch component", () => {
    const { getByText } = render(
      <BrowserRouter>
        <NoMatch />
      </BrowserRouter>
    );

    const heading = getByText(/PAGE NOT FOUND/i);

    screen.debug();
    expect(heading).toMatchSnapshot();
  });
});
