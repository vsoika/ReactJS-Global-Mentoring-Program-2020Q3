import React from "react";
import { Modal, Button } from "react-bootstrap";

import { deleteMovie, getFilteredMovies } from "../../store/actionCreators";
import { useDispatch } from "react-redux";

interface IDeleteMovieProps {
  show: boolean;
  onHide: () => void;
  movieId: number;
  hideMovieDetails: () => void;
}

const DeleteMovie: React.FC<IDeleteMovieProps> = (props) => {
  const { movieId, hideMovieDetails, ...modalProps } = props;
  const dispatch = useDispatch();

  const handleDeleteMovie = () => {
    hideMovieDetails();
    dispatch(deleteMovie(movieId));
    dispatch(getFilteredMovies());
  };

  return (
    <Modal
      {...modalProps}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          DELETE MOVIE
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center text-uppercase font-weight-bold">
        <p>Are you sure you want to delete this movie?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-dark" onClick={handleDeleteMovie}>
          CONFIRM
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteMovie;
