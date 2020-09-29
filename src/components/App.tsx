import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col, Spinner } from "react-bootstrap";
import Search from "./Search";
import GenreFilter from "./GenreFilter";
import ResultsSort from "./ResultsSort";
import MovieCardList from "./MovieCardList";
import AddMovie from "./AddMovie";
import MovieDetails from "./MovieDetails";
import "./App.scss";

import { SORT_OPTIONS, GENRE_OPTIONS } from "../constants";

import { fetchMovies, getFilteredMovies } from "../store/actionCreators";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/reducers";

const App: React.FC = () => {
  // const [allMoviesList, setAllMoviesList] = useState(movies);
  // const [movieList, setMovieList] = useState(movies);
  const [sortOption, setSortOption] = useState(SORT_OPTIONS.release);
  const [selectedGenre, setSelectedGenre] = useState(GENRE_OPTIONS.all);
  const [addMovieModalShow, setAddMovieModalShow] = useState(false);
  const [isSuccessSubmit, setIsSuccessSubmit] = useState(false);
  const [isMovieDetails, setIsMovieDetails] = useState(false);
  const [movieDetailsId, setMovieDetailsId] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const movies = useSelector((store: RootState) => store.movies);
  const { moviesList, pending } = movies;

  const filteredMoviesList = useSelector((store: RootState) => store.movies.filteredMoviesList);

  console.log(movies);

  const handleSearchInputChange = (inputMovie: string) => {
    let filterMovies = [];

    if (inputMovie !== "") {
      // handleGenreFilter(selectedGenre);
      filterMovies = moviesList.filter((movie) => {
        const searchMovie = inputMovie.toLowerCase();
        return movie.title.trim().toLowerCase().includes(searchMovie);
      });
    } else {
      filterMovies = movies;
    }

    // handleSortOption(sortOption, filterMovies);
  };

  // const sortByOption = (option: string) => {
  //   return (a, b) => (a[option] < b[option] ? 1 : -1);
  // };

  // const handleSortOption = (value, sortList: any[] = moviesList) => {
  //   setSortOption(value);

  //   const sortOptionFilter =
  //     value === SORT_OPTIONS.duration
  //       ? sortList.sort(sortByOption("runtime"))
  //       : value === SORT_OPTIONS.rating
  //       ? sortList.sort(sortByOption("vote_average"))
  //       : sortList.sort(sortByOption("release_date"));

  //   // setMovieList(sortOptionFilter);
  // };

  // const handleGenreFilter = (genre: string) => {
  //   setSelectedGenre(genre);

  //   if (document.getElementById("inputMovie")) {
  //     const inputValue = document.getElementById(
  //       "inputMovie"
  //     ) as HTMLInputElement;
  //     inputValue.value = "";
  //   }

  //   let filteredList = [];

  //   if (genre !== GENRE_OPTIONS.all) {
  //     filteredList = moviesList.filter((movie) => movie.genres.includes(genre));
  //   } else {
  //     filteredList = moviesList;
  //   }

  //   handleSortOption(sortOption, filteredList);
  // };

  const handleSuccessSubmit = (newMovie) => {
    setIsSuccessSubmit(true);
    moviesList.push(newMovie);
    // handleGenreFilter(selectedGenre);
  };

  const handleSuccessEdit = (updatedAllMoviesList) => {
    // setAllMoviesList(updatedAllMoviesList);

    setTimeout(() => {
      // handleGenreFilter(selectedGenre);
    }, 1000);
  };

  const showMovieDetails = (id: string) => {
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
                      <Search
                        handleSearchInputChange={handleSearchInputChange}
                      />
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
                  allMoviesList={moviesList}
                  hideMovieDetails={hideMovieDetails}
                />
              )}
            </div>
            <Container>
              <Row className="filter-wrapper mt-3">
                <GenreFilter/>
                <ResultsSort/>
              </Row>

              <Row className="movies-count">
                <Col xs={12}>{filteredMoviesList.length} movies found</Col>
              </Row>
              {
                <MovieCardList
                  handleSuccessEdit={handleSuccessEdit}
                  showMovieDetails={showMovieDetails}
                />
              }
            </Container>
          </>
        )}
      </>
    );
};

export default App;