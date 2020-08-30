import React, { useState } from "react";
import { Modal, Button, Form, ModalBody } from "react-bootstrap";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import AddMovieFormGroup from "../AddMovieFormGroup";

import { GENRE_TYPES, FORM_FIELDS_DATA } from "../../constants";

interface IAddMovieProps {
  show: boolean;
  onHide: () => void;
  isSuccessSubmit: boolean;
  handleSuccessSubmit: () => void;
}

const AddMovie: React.FC<IAddMovieProps> = (props) => {
  const [validated, setValidated] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const { isSuccessSubmit, handleSuccessSubmit, ...modalProps } = props;

  const handleSubmit = (event) => {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
      return;
    }

    const newMovie = {
      title: form.elements.title.value,
      vote_average: form.elements.rating.value,
      release_date: form.elements["release-date"].value,
      poster_path: form.elements["image-url"].value,
      overview: form.elements.overview.value,
      genres: selectedGenres,
      runtime: form.elements.runtime.value,
    };

    console.log(newMovie);
    event.preventDefault();
    handleSuccessSubmit();
    setValidated(true);
  };

  return (
    <Modal
      {...modalProps}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {" "}
          {!isSuccessSubmit ? "ADD MOVIE" : "CONGRATULATIONS"}
        </Modal.Title>
      </Modal.Header>

      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        {!isSuccessSubmit ? (
          <>
            <Modal.Body>
              {Object.values(FORM_FIELDS_DATA).map((field) => {
                return (
                  <AddMovieFormGroup
                    key={field.label}
                    label={field.label}
                    formControlAttributes={field.formControlAttributes}
                  />
                );
              })}
              <Form.Group controlId="genre">
                <Form.Label>Genre</Form.Label>
                <DropdownMultiselect
                  options={GENRE_TYPES}
                  name="genre"
                  required
                  handleOnChange={(selected) => {
                    setSelectedGenres(selected);
                  }}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button type="submit">Submit</Button>
            </Modal.Footer>
          </>
        ) : (
          <p>The movie has been added to database successfully</p>
        )}
      </Form>
    </Modal>
  );
};

export default AddMovie;
