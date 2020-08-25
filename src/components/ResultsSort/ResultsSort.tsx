import React, { Component } from "react";
import { Form } from "react-bootstrap";

import { SORT_OPTIONS } from '../../constants';

interface IResultSortProps {
  handleSortOption: (e: React.ChangeEvent<HTMLInputElement>) => void;
  sortOption: string;
}

const ResultsSort: React.FC<IResultSortProps> = ({handleSortOption, sortOption}) => {
  const {release, duration, rating} = SORT_OPTIONS;

  return (
    <Form.Group controlId="sortBy">
      <Form.Control as="select" onChange={handleSortOption} value={sortOption}>
        <option value={release}>Release date</option>
        <option value={duration}>Film duration</option>
        <option value={rating}>Film rating</option>
      </Form.Control>
    </Form.Group>
  );
};

export default ResultsSort;
