import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import Main from "./Main";
import SearchContainer from "./SearchContainer";

import {
  fetchMovies,
  getMoviesBySearchInput,
  getFilteredMovies,
} from "../store/actionCreators";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/reducers";

import { useHistory, useLocation } from "react-router-dom";
import queryString from "query-string";

import "./App.scss";

const App: React.FC = () => {
  const [searchMovie, setSearchMovie] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const searchQuery = queryString.parse(location.search);

  useEffect(() => {
    if (history.action !== "PUSH") {
      dispatch(fetchMovies());
    }
  }, [dispatch]);

  if (searchMovie !== searchQuery.title) {
    setSearchMovie(searchQuery.title as string);
  }

  useSelector((store: RootState) => {
    return store.movies;
  });

  const movies = useSelector((store: RootState) => store.movies);
  const { fulfilled, isFiltered } = movies;

  useEffect(() => {
    if (fulfilled) {
      dispatch(getFilteredMovies());

      if (searchMovie && isFiltered) {
        dispatch(getMoviesBySearchInput(searchMovie));
      }
    }
  }, [fulfilled, isFiltered, searchMovie]);

  if (!searchMovie && location.search) {
    setSearchMovie(searchQuery.title as string);
  }

  return (
    <>
      {!isFiltered ? (
        <Spinner className="mx-auto" animation="border" variant="danger" />
      ) : (
        <>
          <SearchContainer />
          <Main />
        </>
      )}
    </>
  );
};

export default App;
