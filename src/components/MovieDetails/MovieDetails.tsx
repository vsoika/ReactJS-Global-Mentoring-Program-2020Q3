import React from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";

import { useSelector } from "react-redux";
import { RootState } from "../../store/reducers";
import { useHistory, Redirect, useParams } from "react-router-dom";

import "./MovieDetails.scss";

const MovieDetails: React.FC = () => {
  let history = useHistory();
  const { id } = useParams();
  const moviesStore = useSelector((store: RootState) => store.movies);
  const { filteredMoviesList } = moviesStore;
  const searchStore = useSelector((store: RootState) => store.search);
  let { movieById, isError, fulfilledById } = searchStore;

  if (isError) {
    const movie = filteredMoviesList.filter((item) => item.id === +id);
    movieById = movie.length ? movie[0] : null;
  }

  const hideMovieDetails = () => {
    history.push("/");
  };

  return (
    <>
      {!fulfilledById ? (
        <Spinner className="mx-auto" animation="border" variant="danger" />
      ) : movieById ? (
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
      ) : (
        <Redirect to="/404" />
      )}
    </>
  );
};

export default MovieDetails;
