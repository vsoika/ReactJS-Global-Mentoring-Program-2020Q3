import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Search from "../Search";
import AddMovie from "../AddMovie";

const SearchContainer: React.FC = () => {
  const [addMovieModalShow, setAddMovieModalShow] = useState(false);
  const [isSuccessSubmit, setIsSuccessSubmit] = useState(false);

  const handleSuccessSubmit = () => {
    setIsSuccessSubmit(true);
  };

  return (
    <div className="bg-wrapper">
      <Container>
        <Row>
          <Col xs={12}>
            <h1 className="title text-center text-md-left">FIND YOUR MOVIE</h1>
          </Col>
        </Row>
        <Row className="search-wrapper">
          <Search />
          <Col
            sm={12}
            md={3}
            className="d-flex justify-content-md-end justify-content-center mt-md-0 mt-4"
          >
            <Button
              className="add-movie-btn"
              variant="outline-primary"
              onClick={() => setAddMovieModalShow(true)}
            >
              ADD MOVIE
            </Button>
          </Col>
        </Row>
      </Container>
      <AddMovie
        isSuccessSubmit={isSuccessSubmit}
        handleSuccessSubmit={handleSuccessSubmit}
        show={addMovieModalShow}
        onHide={() => {
          setAddMovieModalShow(false);
          setIsSuccessSubmit(false);
        }}
      />
    </div>
  );
};

export default SearchContainer;
