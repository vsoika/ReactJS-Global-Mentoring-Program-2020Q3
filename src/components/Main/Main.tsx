import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import GenreFilter from "../GenreFilter";
import ResultsSort from "../ResultsSort";
import MovieCardList from "../MovieCardList";

import { useSelector } from "react-redux";
import { Redirect, useLocation } from "react-router-dom";
import { RootState } from "../../store/reducers";

const Main: React.FC = () => {
  const location = useLocation();
  const isSearch = location.search;

  const store = useSelector((store: RootState) => store.movies);
  const { filteredMoviesList } = store;

  return (
    <>
      <Container>
        <Row className="filter-wrapper mt-3">
          <GenreFilter />
          <ResultsSort />
        </Row>

        <Row className="movies-count">
          <Col xs={12}>{filteredMoviesList.length} movies found</Col>
        </Row>

        {!filteredMoviesList.length && isSearch ? (
          <Redirect to="/no-movie-found" />
        ) : (
          <MovieCardList />
        )}
      </Container>
    </>
  );
};

export default Main;
