import React from "react";
import { Form } from "react-bootstrap";

interface IAddMovieFormGroupProps {
  label: string;
  formControlAttributes: any;
  id?: string;
  allMoviesList?: any[];
}

const AddMovieFormGroup: React.FC<IAddMovieFormGroupProps> = ({
  label,
  formControlAttributes,
  id,
  allMoviesList,
}) => {
  const getDefaultValue = (id: string, formName: string) => {
    const selectedMovie = allMoviesList.filter((movie) => movie.id === id);
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
