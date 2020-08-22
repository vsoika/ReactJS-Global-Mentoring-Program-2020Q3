import React from "react";
import "./MovieCard.scss";

interface IMovieCardProps {
  poster_path: string;
  title: string;
  release_date: string;
}

const MovieCard: React.FC<IMovieCardProps> = ({
  poster_path,
  title,
  release_date,
}) => {
  return (
    <li className="movie-card">
      <div className="movie-card__image-wrapper">
        <img className="movie-card__image" src={poster_path}></img>
      </div>
      <div>
        <h4>{title}</h4>
      </div>
      <div>{release_date.slice(0, 4)}</div>
    </li>
  );
};

export default MovieCard;
