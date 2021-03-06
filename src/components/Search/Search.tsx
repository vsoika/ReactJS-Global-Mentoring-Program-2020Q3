import React from "react";
import { Button, InputGroup, FormControl, Col } from "react-bootstrap";

import { getFilteredMovies } from "../../store/actionCreators";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const Search: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const getInputMovie = () => {
    const inputValue = document.getElementById(
      "inputMovie"
    ) as HTMLInputElement;
    const inputMovie = inputValue.value.trim();

    if(inputMovie !== '') {
      history.push(`/search/search?title=${inputMovie}`)
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      getInputMovie();
    }
  };

  const handleChange = (event) => {
    const { value } = event.target;
    if (value === "") {
      dispatch(getFilteredMovies());
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
          onChange={handleChange}
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
