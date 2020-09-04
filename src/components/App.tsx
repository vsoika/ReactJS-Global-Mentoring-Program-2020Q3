import React, { Component } from "react";
import { Button } from "react-bootstrap";
import Search from "./Search";
import GenreFilter from "./GenreFilter";
import ResultsSort from "./ResultsSort";
import MovieCardList from "./MovieCardList";
import AddMovie from "./AddMovie";
import "./App.scss";

import { SORT_OPTIONS, GENRE_OPTIONS } from "../constants";
import movies from "../data/movies.json";

class App extends Component {
  state = {
    allMoviesList: movies,
    movieList: movies,
    sortOption: SORT_OPTIONS.release,
    selectedGenre: GENRE_OPTIONS.all,
    addMovieModalShow: false,
    isSuccessSubmit: false,
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

    if (genre !== GENRE_OPTIONS.all) {
      filteredList = allMoviesList.filter((movie) =>
        movie.genres.includes(genre)
      );
    } else {
      filteredList = allMoviesList;
    }

    this.handleSortOption(sortOption, filteredList);
  };

  handleSuccessSubmit = (newMovie) => {
    const { selectedGenre, allMoviesList } = this.state;
    this.setState({
      isSuccessSubmit: true,
    });

    allMoviesList.push(newMovie);
    this.handleGenreFilter(selectedGenre);
  };

  render() {
    const {
      movieList,
      sortOption,
      addMovieModalShow,
      isSuccessSubmit,
    } = this.state;

    return (
      <>
        <div className="bg-wrapper">
          <h1 className="title">FIND YOUR MOVIE</h1>
          <Search handleSearchInputChange={this.handleSearchInputChange} />
          <Button
            variant="primary"
            onClick={() => this.setState({ addMovieModalShow: true })}
          >
            ADD MOVIE
          </Button>
          <AddMovie
            isSuccessSubmit={isSuccessSubmit}
            handleSuccessSubmit={this.handleSuccessSubmit}
            show={addMovieModalShow}
            onHide={() =>
              this.setState({
                addMovieModalShow: false,
                isSuccessSubmit: false,
              })
            }
          />
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
