import React from "react";
import { render, screen } from "@testing-library/react";
import GenreFilterItem from "../components/GenreFilterItem";

describe("Test suits for GenreFilterItem", () => {
  it("renders GenreFilterItem component", () => {
    const genre = "Documentary";
    const { getByRole } = render(<GenreFilterItem genre={genre} />);
    const anchor = getByRole("button", { name: /Documentary/i });

    screen.debug();
    expect(anchor).toBeInTheDocument();
    expect(anchor).toMatchSnapshot();
  });
});
