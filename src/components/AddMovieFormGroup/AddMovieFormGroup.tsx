import React from "react";
import { Form } from "react-bootstrap";

import { useSelector } from "react-redux";
import { RootState } from "../../store/reducers";

interface IAddMovieFormGroupProps {
  label: string;
  formControlAttributes: any;
  id?: number;
}

const AddMovieFormGroup: React.FC<IAddMovieFormGroupProps> = ({
  label,
  formControlAttributes,
  id,
}) => {
  const filteredMoviesList = useSelector(
    (store: RootState) => store.movies.filteredMoviesList
  );

  const getDefaultValue = (id: number, formName: string) => {
    const selectedMovie = filteredMoviesList.filter((movie) => movie.id === id);
    const movieFormValue = selectedMovie[0][formName];
    return movieFormValue;
  };

  return (
    <Form.Group controlId={formControlAttributes.name}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        {...formControlAttributes}
        defaultValue={
          id ? getDefaultValue(id, formControlAttributes.name) : null
        }
        required
      />
      <Form.Control.Feedback type="invalid">
        {label} is required field.
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default AddMovieFormGroup;
