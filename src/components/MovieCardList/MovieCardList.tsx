import React, { Component } from "react";
import MovieCardItem from "../MovieCardItem";

import "./MovieCardList.scss";

interface IResultContainerProps {
  movieList: any[];
  allMoviesList: any[];
  handleSuccessEdit: (updatedAllMoviesList: any[]) => void;
}

const MovieCardList: React.FC<IResultContainerProps> = ({ movieList, allMoviesList, handleSuccessEdit }) => {
  return (
    <ul className="row list-unstyled list movies-list">
      {movieList.map((movie) => {
        return (
          <MovieCardItem
            key={movie.id}
            id={movie.id}
            poster_path={movie.poster_path}
            title={movie.title}
            release_date={movie.release_date}
            allMoviesList={allMoviesList}
            handleSuccessEdit={handleSuccessEdit}
          />
        );
      })}
    </ul>
  );
};

export default MovieCardList;
