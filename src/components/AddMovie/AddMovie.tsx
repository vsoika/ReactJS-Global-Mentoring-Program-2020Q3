import React, { useState, useRef } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import AddMovieFormGroup from "../AddMovieFormGroup";
import { Multiselect } from "multiselect-react-dropdown";

import { GENRE_TYPES, FORM_FIELDS_DATA } from "../../constants";
import { v4 as uuidv4 } from "uuid";

interface IAddMovieProps {
  show: boolean;
  onHide: () => void;
  isSuccessSubmit: boolean;
  handleSuccessSubmit: (newMovie: {}) => void;
}

const AddMovie: React.FC<IAddMovieProps> = (props) => {
  const [validated, setValidated] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const { isSuccessSubmit, handleSuccessSubmit, ...modalProps } = props;
  const multiselectRef = useRef(null);

  const handleSubmit = (event) => {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
      return;
    }

    const newMovie = {
      id: uuidv4(),
      title: form.elements.title.value,
      vote_average: form.elements["vote_average"].value,
      release_date: form.elements["release_date"].value,
      poster_path: form.elements["poster_path"].value,
      overview: form.elements.overview.value,
      genres: selectedGenres,
      runtime: form.elements.runtime.value,
    };

    event.preventDefault();
    handleSuccessSubmit(newMovie);
    setValidated(true);
  };

  const handleResetForm = (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    Array.from(form.querySelectorAll("input")).forEach(
      (input: HTMLInputElement) => {
        input.value = "";
        multiselectRef.current.resetSelectedValues();
      }
    );
  };

  return (
    <Modal
      {...modalProps}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {!isSuccessSubmit ? "ADD MOVIE" : ""}
        </Modal.Title>
      </Modal.Header>

      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        onReset={handleResetForm}
      >
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
                <Multiselect
                  options={GENRE_TYPES}
                  displayValue="key"
                  name="genre"
                  required
                  showCheckbox={true}
                  ref={multiselectRef}
                  onSelect={(selected) => {
                    setSelectedGenres(selected.map((genre) => genre.key));
                  }}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button type="submit" variant="outline-dark">
                Submit
              </Button>
              <Button type="reset" variant="outline-dark">
                Reset
              </Button>
            </Modal.Footer>
          </>
        ) : (
          <div className="d-flex flex-column">
            <h3 className="mt-4 text-success text-center">CONGRATULATIONS!</h3>
            <p className="mt-2 mb-4 text-center">The movie has been added to database successfully</p>
          </div>
        )}
      </Form>
    </Modal>
  );
};

export default AddMovie;
