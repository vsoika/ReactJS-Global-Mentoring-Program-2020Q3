import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Formik, FormikProps, FormikHelpers } from "formik";
import AddMovieFormGroup from "../AddMovieFormGroup";
import Select from "react-select";
import {
  GENRE_TYPES,
  FORM_FIELDS_DATA,
  SCHEMA,
  IFormikValues,
} from "../../constants";

import { updateMovie, getFilteredMovies } from "../../store/actionCreators";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/reducers";

interface IEditMovieProps {
  show: boolean;
  onHide: () => void;
  movieId: number;
}

const EditMovie: React.FC<IEditMovieProps> = (props) => {
  const { movieId, ...modalProps } = props;
  const dispatch = useDispatch();

  const filteredMoviesList = useSelector(
    (store: RootState) => store.movies.filteredMoviesList
  );

  const selectedMovie = filteredMoviesList.filter((movie) => {
    return movie.id === movieId;
  });

  let selectedMovieGenres;

  if (selectedMovie.length) {
    selectedMovieGenres = selectedMovie[0].genres.map((item) => {
      if (typeof item === "string") {
        return {
          label: item,
          value: item,
        };
      }
      return item;
    });
  }

  const handleSaveForm = (values) => {
    const genres = values.genres.map((genre) => genre.value);
    values.id = movieId;
    values.genres = genres[0] ? genres : selectedMovie[0].genres;

    dispatch(updateMovie(values));
    dispatch(getFilteredMovies());
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
        <Modal.Title id="contained-modal-title-vcenter">EDIT MOVIE</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={selectedMovie[0]}
        validationSchema={SCHEMA}
        onSubmit={(
          values: IFormikValues,
          { setSubmitting, resetForm }: FormikHelpers<IFormikValues>
        ) => {
          setSubmitting(true);
          handleSaveForm(values);
          resetForm();
          setSubmitting(false);
        }}
      >
        {({ ...formikProps }: FormikProps<IFormikValues>) => (
          <Form
            noValidate
            onSubmit={formikProps.handleSubmit}
            onReset={formikProps.handleReset}
          >
            <>
              <Modal.Body>
                {Object.values(FORM_FIELDS_DATA).map((field) => {
                  return (
                    <AddMovieFormGroup
                      key={field.label}
                      label={field.label}
                      formControlAttributes={field.formControlAttributes}
                      formikProps={formikProps}
                    />
                  );
                })}
                <Form.Group controlId="genre">
                  <Form.Label>Genre</Form.Label>
                  <Select
                    name="genre"
                    onChange={(selectedGenres) =>
                      formikProps.setFieldValue(
                        "genres",
                        selectedGenres ? selectedGenres : []
                      )
                    }
                    options={GENRE_TYPES}
                    isMulti={true}
                    isInvalid={!!formikProps.errors.genres}
                    defaultValue={selectedMovieGenres}
                  />
                  <Form.Control.Feedback type="invalid" className="d-block">
                    {formikProps.errors.genres}
                  </Form.Control.Feedback>
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
        )}
      </Formik>
    </Modal>
  );
};

export default EditMovie;
