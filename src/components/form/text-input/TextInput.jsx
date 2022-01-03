import React from 'react';
import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';
import TextField from '@mui/material/TextField';

const TextInput = ({ name, ...props }) => {
  const { setFieldValue } = useFormikContext();

  const handleChange = (event) => setFieldValue(name, event.target.value || '');

  return (
    <TextField
      variant="outlined"
      size="small"
      fullWidth
      onChange={handleChange}
      {...props}
    />
  );
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
};

export default TextInput;
