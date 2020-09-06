import React from "react";
import { Modal, Button } from "react-bootstrap";

interface IDeleteMovieProps {
  show: boolean;
  onHide: () => void;
  movieId: string;
  allMoviesList: any[];
  handleSuccessEdit: (updatedAllMoviesList: any[]) => void;
  //   isSuccessSubmit: boolean;
  //   handleSuccessSubmit: (newMovie: {}) => void;
}

const DeleteMovie: React.FC<IDeleteMovieProps> = (props) => {
  const { movieId, allMoviesList, handleSuccessEdit, ...modalProps } = props;

  const handleDeleteMovie = (movieId: string) => {
    const newMovieList = allMoviesList.filter(movie => movie.id !== +movieId);
    handleSuccessEdit(newMovieList);

    const { onHide } = modalProps;
    onHide();
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
          {/* {!isSuccessSubmit ? "ADD MOVIE" : ""} */}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete this movie?</p>
      </Modal.Body>
      <Modal.Footer>
          <Button onClick={() => handleDeleteMovie(movieId)}>CONFIRM</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteMovie;
