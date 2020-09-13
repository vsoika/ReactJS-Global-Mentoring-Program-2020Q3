import React, { Component } from "react";
import { Button, InputGroup, FormControl, Col } from "react-bootstrap";

interface ISearchProps {
  handleSearchInputChange: (inputMovie: string) => void;
}

class Search extends Component<ISearchProps> {
  state = {
    inputValue: "",
  };

  getInputMovie = () => {
    const inputValue = document.getElementById(
      "inputMovie"
    ) as HTMLInputElement;
    const inputMovie = inputValue.value.trim();
    this.props.handleSearchInputChange(inputMovie);
  };

  handleKeyPress = (event) => {
    if (event.key === "Enter") {
      this.getInputMovie();
    }
  };

  render() {
    return (
      <Col lg={5} md={6} sm={12}>
        <InputGroup>
          <FormControl
            id="inputMovie"
            placeholder="write a movie"
            aria-label="Search movie"
            onKeyPress={this.handleKeyPress}
          />
          <InputGroup.Append>
            <Button
              variant="outline-secondary"
              className="search-btn"
              onClick={this.getInputMovie}
            >
              SEARCH
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Col>
    );
  }
}

export default Search;
