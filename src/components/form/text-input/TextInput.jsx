import React from 'react';
import PropTypes from 'prop-types';
import { useFormikContext, useField } from 'formik';
import TextField from '@mui/material/TextField';

/**
 * Component to insert a text value, connected with Formik state by the param "name".
 */

const TextInput = ({ name, ...props }) => {
  // eslint-disable-next-line no-unused-vars
  const [_, meta] = useField(name);
  const { setFieldValue, setFieldTouched } = useFormikContext();

  const handleChange = (event) => setFieldValue(name, event.target.value || '');

  const handleBlur = () => setFieldTouched(name);

  const errors = {};

  if (meta && meta.touched && meta.error) {
    errors.error = true;
    errors.helperText = meta.error;
  }

  return (
    <TextField
      variant="outlined"
      size="small"
      fullWidth
      onBlur={handleBlur}
      onChange={handleChange}
      {...props}
      {...errors}
    />
  );
};

TextInput.propTypes = {
  /**
   * The field name that connects the table with the Formik state.
   */
  name: PropTypes.string.isRequired,
};

export default TextInput;
