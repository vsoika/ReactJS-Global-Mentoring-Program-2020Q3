import React from "react";
import { Button, InputGroup, FormControl, Col } from "react-bootstrap";

interface ISearchProps {
  handleSearchInputChange: (inputMovie: string) => void;
}

const Search: React.FC<ISearchProps> = ({ handleSearchInputChange }) => {
  const getInputMovie = () => {
    const inputValue = document.getElementById(
      "inputMovie"
    ) as HTMLInputElement;
    const inputMovie = inputValue.value.trim();
    handleSearchInputChange(inputMovie);
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
