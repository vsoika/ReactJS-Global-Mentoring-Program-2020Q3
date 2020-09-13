import React, { Component } from "react";
import { Nav, Col } from "react-bootstrap";
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
      <Col md={9} xs={12} className="mb-4">
        <Nav
          className="justify-content-md-start justify-content-center"
          variant="pills"
          activeKey={this.state.selectedGenre || GENRE_OPTIONS.all}
          onSelect={(e) => this.handleSelect(e)}
        >
          {Object.values(GENRE_OPTIONS).map((genre) => {
            return <GenreFilterItem key={uuidv4()} genre={genre} />;
          })}
        </Nav>
      </Col>
    );
  }
}

export default GenreFilter;
