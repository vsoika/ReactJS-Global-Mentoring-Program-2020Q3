import React from "react";
import { Form, Col } from "react-bootstrap";
import { SORT_OPTIONS } from "../../constants";

import { setSortOption, getFilteredMovies } from "../../store/actionCreators";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/reducers";

const ResultsSort: React.FC = () => {
  const { release, duration, rating } = SORT_OPTIONS;
  const dispatch = useDispatch();
  const sortOption = useSelector((store: RootState) => store.movies.sortOption);

  const handleSetSortOption = (option: string) => {
    dispatch(setSortOption(option));
    dispatch(getFilteredMovies());
  };

  return (
    <Col md={3} xs={12} className="mb-2">
      <Form.Group controlId="sortBy">
        <Form.Control
          as="select"
          onChange={(e) => handleSetSortOption(e.target.value)}
          value={sortOption}
        >
          <option value={release}>Release date</option>
          <option value={duration}>Film duration</option>
          <option value={rating}>Film rating</option>
        </Form.Control>
      </Form.Group>
    </Col>
  );
};

export default ResultsSort;
