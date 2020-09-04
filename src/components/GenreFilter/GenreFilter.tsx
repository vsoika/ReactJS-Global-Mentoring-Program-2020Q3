import React, { Component } from "react";
import { Nav } from "react-bootstrap";
import GenreFilterItem from "../GenreFilterItem";
import { GENRE_OPTIONS } from "../../constants";
import { v4 as uuidv4 } from "uuid";

interface IGenreFilterState {
  selectedGenre: string;
}

interface IGenreFilterProps {
  handleGenreFilter: (genre: string) => void;
}

class GenreFilter extends Component<IGenreFilterProps, IGenreFilterState> {
  state = {
    selectedGenre: "",
  };

  handleSelect = (eventKey) => {
    this.setState({ selectedGenre: eventKey });
    this.props.handleGenreFilter(eventKey);
  };

  render() {
    return (
      <>
        <Nav
          className="mb-3"
          variant="pills"
          activeKey={this.state.selectedGenre || GENRE_OPTIONS.all}
          onSelect={(e) => this.handleSelect(e)}
        >
          {Object.values(GENRE_OPTIONS).map((genre) => {
            return <GenreFilterItem key={uuidv4()} genre={genre} />;
          })}
        </Nav>
      </>
    );
  }
}

export default GenreFilter;
