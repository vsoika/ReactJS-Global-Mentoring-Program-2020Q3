import React, { Component } from "react";
import { Nav } from "react-bootstrap";

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
          activeKey={this.state.selectedGenre || "All"}
          onSelect={(e) => this.handleSelect(e)}
        >
          <Nav.Item>
            <Nav.Link eventKey="All">All</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="Documentary">Documentary</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="Comedy">Comedy</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="Horror">Horror</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="Crime">Crime</Nav.Link>
          </Nav.Item>
        </Nav>
      </>
    );
  }
}

export default GenreFilter;