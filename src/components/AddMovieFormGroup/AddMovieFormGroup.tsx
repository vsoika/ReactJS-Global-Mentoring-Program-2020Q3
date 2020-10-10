import React from "react";
import { Form } from "react-bootstrap";
import { FormikProps } from "formik";
import { IFormikValues } from "../../constants";

interface IAddMovieFormGroupProps {
  label: string;
  formControlAttributes: { [key: string]: string };
  formikProps: FormikProps<IFormikValues>;
}

const AddMovieFormGroup: React.FC<IAddMovieFormGroupProps> = ({
  label,
  formControlAttributes,
  formikProps,
}) => {
  const { values, errors, handleChange } = formikProps;

  return (
    <Form.Group controlId={formControlAttributes.name}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        {...formControlAttributes}
        value={values[formControlAttributes.name]}
        onChange={handleChange}
        isInvalid={!!errors[formControlAttributes.name]}
      />
      <Form.Control.Feedback type="invalid">
        {errors[formControlAttributes.name]}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default AddMovieFormGroup;
