import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col, Spinner } from "react-bootstrap";
import Search from "./Search";
import GenreFilter from "./GenreFilter";
import ResultsSort from "./ResultsSort";
import MovieCardList from "./MovieCardList";
import AddMovie from "./AddMovie";
import MovieDetails from "./MovieDetails";
import "./App.scss";

import { fetchMovies, getMoviesBySearchInput } from "../store/actionCreators";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/reducers";

const App: React.FC = () => {
  const [addMovieModalShow, setAddMovieModalShow] = useState(false);
  const [isMovieDetails, setIsMovieDetails] = useState(false);
  const [movieDetailsId, setMovieDetailsId] = useState(1);
  const [isSuccessSubmit, setIsSuccessSubmit] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const movies = useSelector((store: RootState) => store.movies);
  const { pending } = movies;
  const filteredMoviesList = useSelector(
    (store: RootState) => store.movies.filteredMoviesList
  );

  const handleSearchInputChange = (inputMovie: string) => {
    if (inputMovie !== "") {
      dispatch(getMoviesBySearchInput(inputMovie));
    }
  };

  const handleSuccessSubmit = () => {
    setIsSuccessSubmit(true);
  };

  const showMovieDetails = (id: number) => {
    setMovieDetailsId(id);
    setIsMovieDetails(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const hideMovieDetails = () => setIsMovieDetails(false);

  return (
    <>
      {pending ? (
        <Spinner className="mx-auto" animation="border" variant="danger" />
      ) : (
        <>
          <div className="bg-wrapper">
            {!isMovieDetails ? (
              <>
                <Container>
                  <Row>
                    <Col xs={12}>
                      <h1 className="title text-center text-md-left">
                        FIND YOUR MOVIE
                      </h1>
                    </Col>
                  </Row>
                  <Row className="search-wrapper">
                    <Search handleSearchInputChange={handleSearchInputChange} />
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
              </>
            ) : (
              <MovieDetails
                movieId={movieDetailsId}
                hideMovieDetails={hideMovieDetails}
              />
            )}
          </div>
          <Container>
            <Row className="filter-wrapper mt-3">
              <GenreFilter hideMovieDetails={hideMovieDetails} />
              <ResultsSort />
            </Row>

            <Row className="movies-count">
              <Col xs={12}>{filteredMoviesList.length} movies found</Col>
            </Row>
            {<MovieCardList showMovieDetails={showMovieDetails} hideMovieDetails={hideMovieDetails}/>}
          </Container>
        </>
      )}
    </>
  );
};

export default App;
