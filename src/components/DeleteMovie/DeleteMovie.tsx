import React, { useMemo, useCallback } from "react";
import { Modal, Button } from "react-bootstrap";

interface IDeleteMovieProps {
  show: boolean;
  onHide: () => void;
  movieId: string;
  allMoviesList: any[];
  handleSuccessEdit: (updatedAllMoviesList: any[]) => void;
}

const DeleteMovie: React.FC<IDeleteMovieProps> = (props) => {
  const { movieId, allMoviesList, handleSuccessEdit, ...modalProps } = props;

  const newMovieList = useMemo(() => allMoviesList.filter((movie) => movie.id !== movieId), [allMoviesList, movieId]);

  const handleDeleteMovie = useCallback(() => {
    handleSuccessEdit(newMovieList);
    const { onHide } = modalProps;
    onHide();
  }, [newMovieList]);

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
        <Button
          variant="outline-dark"
          onClick={handleDeleteMovie}
        >
          CONFIRM
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteMovie;
