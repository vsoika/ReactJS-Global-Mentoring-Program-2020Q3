import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import AddMovieFormGroup from "../AddMovieFormGroup";
import { Multiselect } from "multiselect-react-dropdown";

import { GENRE_TYPES, FORM_FIELDS_DATA } from "../../constants";
import { v4 as uuidv4 } from "uuid";

interface IEditMovieProps {
  show: boolean;
  onHide: () => void;
  movieId: string;
  allMoviesList: any[];
  handleSuccessEdit: (updatedAllMoviesList: any[]) => void;
  //   isSuccessSubmit: boolean;
  //   handleSuccessSubmit: (newMovie: {}) => void;
}

const EditMovie: React.FC<IEditMovieProps> = (props) => {
  const [validated, setValidated] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const { movieId, allMoviesList, handleSuccessEdit, ...modalProps } = props;
  let selectedMovieGenres;

  if (movieId) {
    const selectedMovie = allMoviesList.filter(
      (movie) => movie.id === +movieId
    );
    selectedMovieGenres = selectedMovie[0].genres.map(genre => {
      return { key: genre, label: genre };
    });
  }

  console.log(movieId);

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
      //   id: uuidv4(),
      title: form.elements.title.value,
      vote_average: form.elements["vote_average"].value,
      release_date: form.elements["release_date"].value,
      poster_path: form.elements["poster_path"].value,
      overview: form.elements.overview.value,
      genres: selectedGenres,
      runtime: form.elements.runtime.value,
    };

    const updatedAllMoviesList = allMoviesList.map((movie) => {
      if (movie.id === +movieId) {
        movie = newMovie;
        movie.id = +movieId;
      }

      return movie;
    });

    handleSuccessEdit(updatedAllMoviesList);

    // handleSuccessSubmit(newMovie);
    setValidated(true);
  };

  const handleResetForm = (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    Array.from(form.querySelectorAll("input")).forEach(
      (input: HTMLInputElement) => {
        if (input.checked) {
          input.checked = false;
          return;
        }
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
        <Modal.Title id="contained-modal-title-vcenter">
          EDIT MOVIE
          {/* {!isSuccessSubmit ? "ADD MOVIE" : ""} */}
        </Modal.Title>
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
                selectedValues={selectedMovieGenres}
                onSelect={(selected) => {
                  setSelectedGenres(selected);
                }}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit">Save</Button>
            <Button type="reset">Reset</Button>
          </Modal.Footer>
        </>

        {/* <>
            <h2>CONGRATULATIONS!</h2>
            <p>The movie has been added to database successfully</p>
          </> */}
      </Form>
    </Modal>
  );
};

export default EditMovie;
