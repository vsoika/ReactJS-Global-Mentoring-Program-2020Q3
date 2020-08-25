import React from "react";
// import "./MovieCardItem.scss";

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
    <li className="movies-list__card">
      <div className="movies-list__image-wrapper">
        <img className="movies-list__image" src={poster_path}></img>
      </div>
      <div className="movies-list__description">
        <h5 className="movies-list__title">{title}</h5>
        <p className="movies-list__release-date">{release_date.slice(0, 4)}</p>
      </div>
    </li>
  );
};

export default MovieCard;
