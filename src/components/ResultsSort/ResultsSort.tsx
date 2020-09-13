import React from "react";
import { Form, Col } from "react-bootstrap";
import { SORT_OPTIONS } from "../../constants";

interface IResultSortProps {
  handleSortOption: (value: string) => void;
  sortOption: string;
}

const ResultsSort: React.FC<IResultSortProps> = ({
  handleSortOption,
  sortOption,
}) => {
  const { release, duration, rating } = SORT_OPTIONS;

  return (
    <Col md={3} xs={12} className="mb-2">
      <Form.Group controlId="sortBy">
        <Form.Control
          as="select"
          onChange={(e) => handleSortOption(e.target.value)}
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
