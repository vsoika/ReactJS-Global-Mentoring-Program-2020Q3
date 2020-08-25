import React, { Component } from "react";
import { Form } from "react-bootstrap";
import MovieCardItem from "../MovieCardItem";

import "./MovieCardList.scss";

// import movies from '../../data/movies.json';

interface IResultContainerProps {
  movieList: any[];
}

const MovieCardList: React.FC<IResultContainerProps> = ({ movieList }) => {
  return (
    <>
      <div className="movies-count">{movieList.length} movies found</div>
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
    </>
  );
};

export default MovieCardList;
