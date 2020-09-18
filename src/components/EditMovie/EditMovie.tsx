import React, { useState, useRef } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import AddMovieFormGroup from "../AddMovieFormGroup";
import { Multiselect } from "multiselect-react-dropdown";

import { GENRE_TYPES, FORM_FIELDS_DATA } from "../../constants";

interface IEditMovieProps {
  show: boolean;
  onHide: () => void;
  movieId: string;
  allMoviesList: any[];
  handleSuccessEdit: (updatedAllMoviesList: any[]) => void;
}

const EditMovie: React.FC<IEditMovieProps> = (props) => {
  const [validated, setValidated] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const { movieId, allMoviesList, handleSuccessEdit, ...modalProps } = props;
  const multiselectRef = useRef(null);
  let selectedMovieGenres;

  if (movieId) {
    const selectedMovie = allMoviesList.filter(
      (movie) => movie.id === movieId
    );

    if (selectedMovie.length) {
      selectedMovieGenres = selectedMovie[0].genres.map((genre) => {
        return { key: genre, label: genre };
      });
    }
  }

  const handleSave = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
      return;
    }

    const newMovie = {
      title: form.elements.title.value,
      vote_average: form.elements["vote_average"].value,
      release_date: form.elements["release_date"].value,
      poster_path: form.elements["poster_path"].value,
      overview: form.elements.overview.value,
      genres: selectedGenres.map((genre) => genre.label),
      runtime: form.elements.runtime.value,
    };

    const updatedAllMoviesList = allMoviesList.map((movie) => {
      if (movie.id === movieId) {
        movie = newMovie;
        movie.id = movieId;
      }
      return movie;
    });

    handleSuccessEdit(updatedAllMoviesList);
    setValidated(true);
    const { onHide } = modalProps;
    onHide();
  };

  const handleResetForm = (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    Array.from(form.querySelectorAll("input")).forEach(
      (input: HTMLInputElement) => {
        multiselectRef.current.resetSelectedValues();
        input.value = "";
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
        <Modal.Title id="contained-modal-title-vcenter">EDIT MOVIE</Modal.Title>
      </Modal.Header>

      <Form
        noValidate
        validated={validated}
        onSubmit={handleSave}
        onReset={handleResetForm}
      >
        <>
          <Modal.Body>
            {Object.values(FORM_FIELDS_DATA).map((field) => {
              return (
                <AddMovieFormGroup
                  key={field.label}
                  label={field.label}
                  formControlAttributes={field.formControlAttributes}
                  id={movieId}
                  allMoviesList={allMoviesList}
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
                selectedValues={selectedMovieGenres}
                onSelect={(selected) => {
                  setSelectedGenres(selected);
                }}
                onRemove={(selected) => {
                  setSelectedGenres(selected);
                }}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" variant="outline-dark">
              Save
            </Button>
            <Button type="reset" variant="outline-dark">
              Reset
            </Button>
          </Modal.Footer>
        </>
      </Form>
    </Modal>
  );
};

export default EditMovie;
