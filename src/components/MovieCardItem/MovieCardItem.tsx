import React, { useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import EditMovie from "../EditMovie";
import DeleteMovie from "../DeleteMovie";

interface IMovieCardProps {
  poster_path: string;
  title: string;
  release_date: string;
  id: number;
  allMoviesList: any[];
  handleSuccessEdit: (updatedAllMoviesList: any[]) => void;
}

const MovieCardItem: React.FC<IMovieCardProps> = ({
  poster_path,
  title,
  release_date,
  id,
  allMoviesList,
  handleSuccessEdit,
}) => {
  const [editMovieModalShow, setEditMovieModalShow] = useState(false);
  const [deleteMovieModalShow, setDeleteMovieModalShow] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState("");

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
    console.log(e.target);
    const selectedOption = e.target.textContent;
    const selectedMovieId = e.currentTarget.parentNode.getAttribute("id");

    if (!selectedOption) return;

    console.log(selectedOption);

    selectedOption === "Edit"
      ? setEditMovieModalShow(true)
      : setDeleteMovieModalShow(true);

    setSelectedMovieId(selectedMovieId);
  };

  return (
    <li
      className="movie-card"
      id={String(id)}
      onMouseEnter={(e) => showEditButton(e)}
      onMouseLeave={(e) => hideEditButton(e)}
    >
      <div className="movie-card__image-wrapper">
        <img className="movie-card__image" src={poster_path} alt={title}></img>
      </div>
      <div className="movie-card__description">
        <h5 className="movie-card__title">{title}</h5>
        <p className="movie-card__release-date">{release_date.slice(0, 4)}</p>
      </div>
      {/* <div className="movie-card__edit-button">:</div> */}
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
        allMoviesList={allMoviesList}
        handleSuccessEdit={handleSuccessEdit}
      />
      <DeleteMovie
        show={deleteMovieModalShow}
        onHide={() => setDeleteMovieModalShow(false)}
        movieId={selectedMovieId}
        allMoviesList={allMoviesList}
        handleSuccessEdit={handleSuccessEdit}
      />
    </li>
  );
};

export default MovieCardItem;
