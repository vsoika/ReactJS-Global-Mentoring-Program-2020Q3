import React from "react";
import { Button, InputGroup, FormControl, Col } from "react-bootstrap";
import Router from "next/router";

const Search: React.FC = () => {
  const getInputMovie = () => {
    const inputValue = document.getElementById(
      "inputMovie"
    ) as HTMLInputElement;
    const inputMovie = inputValue.value.trim();

    if(inputMovie !== '') {
      Router.push(`/search?title=${inputMovie}`)
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      getInputMovie();
    }
  };

  return (
    <Col lg={5} md={6} sm={12}>
      <InputGroup>
        <FormControl
          id="inputMovie"
          placeholder="write a movie"
          aria-label="Search movie"
          onKeyPress={handleKeyPress}
        />
        <InputGroup.Append>
          <Button
            variant="outline-secondary"
            className="search-btn"
            onClick={getInputMovie}
          >
            SEARCH
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </Col>
  );
};

export default Search;
