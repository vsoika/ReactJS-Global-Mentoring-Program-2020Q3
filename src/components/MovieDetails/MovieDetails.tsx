import React, { useMemo } from "react";
import { Container, Row, Col } from "react-bootstrap";

import "./MovieDetails.scss";

interface IMovieDetailsProps {
  movieId: string;
  allMoviesList: any[];
  hideMovieDetails: () => void;
}

const MovieDetails: React.FC<IMovieDetailsProps> = ({
  movieId,
  allMoviesList,
  hideMovieDetails,
}) => {
  const movie = useMemo(() => allMoviesList.filter((movie) => movie.id === movieId), [allMoviesList, movieId]);

  const {
    title,
    vote_average,
    release_date,
    poster_path,
    overview,
    runtime,
  } = movie[0];

  return (
    <div className="movie-details">
      <Container>
        <Row>
          <Col xs={4}>
            <img
              className="movie-details__image"
              src={poster_path}
              alt={title}
            ></img>
          </Col>
          <Col xs={8} className="movie-details__description">
            <div className="d-flex">
              <h2 className="pr-4">{title.toUpperCase()}</h2>
              <div className="movie-details__average">{vote_average}</div>
            </div>
            <h5>
              <span className="pr-4">{release_date.slice(0, 4)}</span>
              <span>{`${runtime} min`}</span>
            </h5>
            <p>{overview}</p>
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