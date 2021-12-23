import React from 'react';
import PropTypes from 'prop-types';
import { useField, useFormikContext } from 'formik';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const Select = ({ name, options, ...props }) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();

  const handleChange = (event) => {
    const { value } = event.target;
    setFieldValue(name, value);
  };

  const configSelect = {
    ...field,
    ...props,
    select: true,
    variant: 'outlined',
    fullWidth: true,
    onChange: handleChange,
  };

  if (meta && meta.touched && meta.error) {
    configSelect.error = true;
    configSelect.helperText = 'Required';
  }

  return (
    <TextField {...configSelect} size="small">
      {Object.keys(options).map((item, pos) => {
        return (
          <MenuItem key={pos} value={item}>
            {options[item]}
          </MenuItem>
        );
      })}
    </TextField>
  );
};

Select.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.object.isRequired,
};

export default Select;
