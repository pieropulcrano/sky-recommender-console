import React from 'react';
import TextField from '@mui/material/TextField';
import { useFormikContext } from 'formik';

const TextInput = ({ name, ...props }) => {
  const { setFieldValue } = useFormikContext();

  const handleChange = (event) => {
    setFieldValue(name, event.target.value || '');
  };

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

export default TextInput;
