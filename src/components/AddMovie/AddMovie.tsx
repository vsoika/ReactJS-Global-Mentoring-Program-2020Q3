import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Formik, FormikHelpers } from "formik";
import AddMovieFormGroup from "../AddMovieFormGroup";
import Select from "react-select";
import {
  GENRE_TYPES,
  FORM_FIELDS_DATA,
  SCHEMA,
  IFormikValues,
} from "../../constants";

import { addMovie } from "../../store/actionCreators";
import { useDispatch } from "react-redux";

interface IAddMovieProps {
  show: boolean;
  onHide: () => void;
  isSuccessSubmit: boolean;
  handleSuccessSubmit: () => void;
}

const AddMovie: React.FC<IAddMovieProps> = (props) => {
  const { isSuccessSubmit, handleSuccessSubmit, ...modalProps } = props;

  const dispatch = useDispatch();

  const handleSubmitForm = (values) => {
    const genres = values.genres.map((genre) => genre.value);
    values.genres = genres;

    dispatch(addMovie(values));
    handleSuccessSubmit();
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

      <Formik
        initialValues={{
          title: "",
          vote_average: 0,
          release_date: "",
          poster_path: "",
          overview: "",
          runtime: 0,
          genres: [],
        }}
        validationSchema={SCHEMA}
        onSubmit={(
          values: IFormikValues,
          { setSubmitting, resetForm }: FormikHelpers<IFormikValues>
        ) => {
          setSubmitting(true);
          handleSubmitForm(values);
          resetForm();
          setSubmitting(false);
        }}
      >
        {({ ...formikProps }) => (
          <Form
            noValidate
            onSubmit={formikProps.handleSubmit}
            onReset={formikProps.handleReset}
            data-testid="form"
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
                        formikProps={formikProps}
                      />
                    );
                  })}
                  <Form.Group controlId="genre">
                    <Form.Label>Genre</Form.Label>
                    <Select
                      inputId="genre"
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
                    />
                    <Form.Control.Feedback type="invalid" className="d-block">
                      {formikProps.errors.genres}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    type="submit"
                    variant="outline-dark"
                    data-testid="submit-button"
                    disabled={formikProps.isSubmitting}
                  >
                    Submit
                  </Button>
                  <Button type="reset" variant="outline-dark">
                    Reset
                  </Button>
                </Modal.Footer>
              </>
            ) : (
              <div className="d-flex flex-column">
                <h3 className="mt-4 text-success text-center">
                  CONGRATULATIONS!
                </h3>
                <p className="mt-2 mb-4 text-center">
                  The movie has been added to database successfully
                </p>
              </div>
            )}
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default AddMovie;
