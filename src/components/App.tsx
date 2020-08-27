import React, { Component } from "react";
import Search from "./Search";
import GenreFilter from "./GenreFilter";
import ResultsSort from "./ResultsSort";
import MovieCardList from "./MovieCardList";
import "./App.scss";

import { SORT_OPTIONS } from "../constants";
import movies from "../data/movies.json";

class App extends Component {
  state = {
    allMoviesList: movies,
    movieList: movies,
    sortOption: SORT_OPTIONS.release,
    selectedGenre: "",
  };

  handleSearchInputChange = (inputMovie: string) => {
    let filterMovies = [];
    const { selectedGenre, sortOption } = this.state;

    if (inputMovie !== "") {
      this.handleGenreFilter(selectedGenre);
      const { movieList } = this.state;
      filterMovies = movieList.filter((movie) => {
        const searchMovie = inputMovie.toLowerCase();

        return movie.title.trim().toLowerCase().includes(searchMovie);
      });
    } else {
      filterMovies = movies;
    }

    this.handleSortOption(sortOption, filterMovies);
  };

  sortByOption = (option: string) => {
    return (a, b) => (a[option] < b[option] ? 1 : -1);
  };

  handleSortOption = (value, sortList: any[] = this.state.movieList) => {
    this.setState({
      sortOption: value,
    });

    const sortOptionFilter =
      value === SORT_OPTIONS.duration
        ? sortList.sort(this.sortByOption("runtime"))
        : value === SORT_OPTIONS.rating
        ? sortList.sort(this.sortByOption("vote_average"))
        : sortList.sort(this.sortByOption("release_date"));

    this.setState({
      movieList: sortOptionFilter,
    });
  };

  handleGenreFilter = (genre: string) => {
    this.setState({
      selectedGenre: genre,
    });

    const inputValue = document.getElementById(
      "inputMovie"
    ) as HTMLInputElement;
    inputValue.value = "";

    const { allMoviesList, sortOption } = this.state;
    let filteredList = [];

    if (genre !== "All") {
      filteredList = allMoviesList.filter((movie) =>
        movie.genres.includes(genre)
      );
    } else {
      filteredList = allMoviesList;
    }

    this.handleSortOption(sortOption, filteredList);
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
        <div className="movies-count">{movieList.length} movies found</div>
        <MovieCardList movieList={movieList} />
      </>
    );
  }
}

export default App;