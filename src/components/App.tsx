import React, { Component } from "react";
import Search from "./Search";
import GenreFilter from "./GenreFilter";
import ResultsSort from "./ResultsSort";
import MovieCardList from "./MovieCardList";
import "./App.scss";

import { SORT_OPTIONS } from "../constants";
import movies from "../data/movies.json";
import { string } from "prop-types";

console.log(movies.sort((a, b) => b.vote_average - a.vote_average));

class App extends Component {
  state = {
    allMoviesList: movies,
    movieList: movies,
    sortOption: "",
    selectedGenre: "",
  };

  handleSearchInputChange = (inputMovie: string) => {
    let filterMovies = [];
    const { movieList } = this.state;

    console.log(movieList);

    if (inputMovie !== "") {
      filterMovies = movieList.filter((movie) => {
        const searchMovie = inputMovie.toLowerCase();

        return movie.title.trim().toLowerCase().includes(searchMovie);
      });
    } else {
      filterMovies = movies;
    }

    this.setState({ movieList: filterMovies });
  };

  sortByOption = (option: string) => {
    return (a, b) => (a[option] < b[option] ? 1 : -1);
  };

  handleSortOption = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;

    this.setState({
      sortOption: value,
    });

    const { sortOption, movieList } = this.state;

    const sortOptionFilter =
      value === SORT_OPTIONS.duration
        ? movieList.sort(this.sortByOption("runtime"))
        : value === SORT_OPTIONS.rating
        ? movieList.sort(this.sortByOption("vote_average"))
        : movieList.sort(this.sortByOption("release_date"));

    this.setState({
      movieList: sortOptionFilter,
    });
  };

  handleGenreFilter = (genre: string) => {
    this.setState({
      selectedGenre: genre,
    });

    const { allMoviesList } = this.state;
    let filteredList = [];

    if (genre !== "All") {
      filteredList = allMoviesList.filter((movie) =>
        movie.genres.includes(genre)
      );
    } else {
      filteredList = allMoviesList;
    }

    this.setState({ movieList: filteredList });
  };

  render() {
    const { movieList, sortOption } = this.state;
    return (
      <>
        <div className="bg-wrapper">
          <h1 className="title">FIND YOUR MOVIE</h1>
        <Search handleSearchInputChange={this.handleSearchInputChange} />
        </div>
        <div className="filter-wrapper mt-3">
          <GenreFilter handleGenreFilter={this.handleGenreFilter} />
          <ResultsSort
            handleSortOption={this.handleSortOption}
            sortOption={sortOption}
          />
        </div>
        <MovieCardList movieList={movieList} />
      </>
    );
  }
}

export default App;
