import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducers";
import Router from "next/router";

const MovieDetails: React.FC = () => {
  const searchStore = useSelector((store: RootState) => store.search);
  const { movieById } = searchStore;

  const hideMovieDetails = () => {
    Router.push("/");
  };

  return (
      <div className="movie-details">
        <Container>
          <Row>
            <Col xs={4}>
              <img
                className="movie-details__image"
                src={movieById.poster_path}
                alt={movieById.title}
              ></img>
            </Col>
            <Col xs={8} className="movie-details__description">
              <div className="d-flex">
                <h2 className="pr-4">{movieById.title.toUpperCase()}</h2>
                <div className="movie-details__average">
                  {movieById.vote_average}
                </div>
              </div>
              <h5>
                <span className="pr-4">
                  {movieById.release_date.slice(0, 4)}
                </span>
                <span>{`${movieById.runtime} min`}</span>
              </h5>
              <p>{movieById.overview}</p>
              <div
                className="movie-details__close-bnt"
                onClick={hideMovieDetails}
              >
                ×
              </div>
            </Col>
          </Row>
        </Container>
      </div>
  );
};

export default MovieDetails;
