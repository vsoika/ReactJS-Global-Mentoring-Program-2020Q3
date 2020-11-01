import React, { useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import EditMovie from "../EditMovie";
import DeleteMovie from "../DeleteMovie";

import { Link } from "react-router-dom";

interface IMovieCardProps {
  poster_path: string;
  title: string;
  release_date: string;
  id: number;
}

const MovieCardItem: React.FC<IMovieCardProps> = ({
  poster_path,
  title,
  release_date,
  id,
}) => {
  const [editMovieModalShow, setEditMovieModalShow] = useState(false);
  const [deleteMovieModalShow, setDeleteMovieModalShow] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState(1);

  const showEditButton = (e) => {
    const card = e.currentTarget;
    const editButton = card.querySelector(".movie-card__edit-button");
    editButton.classList.add("show");
  };

  const hideEditButton = (e) => {
    const card = e.currentTarget;
    const editButton = card.querySelector(".movie-card__edit-button");
    editButton.classList.remove("show");
  };

  const handleDropdownButton = (e) => {
    const selectedOption = e.target.textContent;
    const selectedMovieId = Number(
      e.currentTarget.parentNode.getAttribute("id")
    );

    if (!selectedOption) return;

    selectedOption === "Edit"
      ? setEditMovieModalShow(true)
      : setDeleteMovieModalShow(true);

    setSelectedMovieId(selectedMovieId);
  };

  return (
    <li
      className="movie-card mr-sm-3"
      id={String(id)}
      onTouchStart={(e) => showEditButton(e)}
      onMouseEnter={(e) => showEditButton(e)}
      onMouseLeave={(e) => hideEditButton(e)}
    >
      <Link to={`/film/${id}`}>
        <div className="movie-card__image-wrapper">
          <img
            className="movie-card__image"
            src={poster_path}
            alt={title}
          ></img>
        </div>
      </Link>
      <div className="movie-card__description">
        <h5 className="movie-card__title">{title}</h5>
        <p className="movie-card__release-date">{release_date.slice(0, 4)}</p>
      </div>
      <DropdownButton
        id="dropdown-basic-button"
        className="movie-card__edit-button"
        title=""
        onClick={(e) => handleDropdownButton(e)}
      >
        <Dropdown.Item>Edit</Dropdown.Item>
        <Dropdown.Item>Delete</Dropdown.Item>
      </DropdownButton>
      <EditMovie
        show={editMovieModalShow}
        onHide={() => setEditMovieModalShow(false)}
        movieId={selectedMovieId}
      />
      <DeleteMovie
        show={deleteMovieModalShow}
        onHide={() => setDeleteMovieModalShow(false)}
        movieId={selectedMovieId}
      />
    </li>
  );
};

export default MovieCardItem;
