import React from 'react';
import PropTypes from 'prop-types';
import { useFormikContext, useField } from 'formik';
import TextField from '@mui/material/TextField';

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
  name: PropTypes.string.isRequired,
};

export default TextInput;
