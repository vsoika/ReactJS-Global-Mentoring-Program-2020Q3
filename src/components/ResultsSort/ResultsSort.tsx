import React, { Component } from "react";
import { Form } from "react-bootstrap";

const ResultsSort: React.FC = () => {
  return (
    <Form.Group controlId="sortBy">
      <Form.Control as="select">
        <option>Release date</option>
        <option>Film duration</option>
        <option>Film rating</option>
      </Form.Control>
    </Form.Group>
  );
};

export default ResultsSort;
