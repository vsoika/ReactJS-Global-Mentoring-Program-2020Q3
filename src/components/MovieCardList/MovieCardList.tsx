import React, { Component } from "react";
import MovieCardItem from "../MovieCardItem";

import "./MovieCardList.scss";

interface IResultContainerProps {
  movieList: any[];
}

const MovieCardList: React.FC<IResultContainerProps> = ({ movieList }) => {
  return (
    <ul className="row list-unstyled list movies-list">
      {movieList.map((movie) => {
        return (
          <MovieCardItem
            key={movie.id}
            poster_path={movie.poster_path}
            title={movie.title}
            release_date={movie.release_date}
          />
        );
      })}
    </ul>
  );
};

export default MovieCardList;
