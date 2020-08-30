import React from "react";
import { Form } from "react-bootstrap";

interface IAddMovieFormGroupProps {
  label: string;
  formControlAttributes: any;
}

const AddMovieFormGroup: React.FC<IAddMovieFormGroupProps> = ({
  label,
  formControlAttributes,
}) => {
  return (
    <Form.Group controlId={formControlAttributes.name}>
      <Form.Label>{label}</Form.Label>
      <Form.Control {...formControlAttributes} required />
      <Form.Control.Feedback type="invalid">
        {label} is required field.
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default AddMovieFormGroup;
