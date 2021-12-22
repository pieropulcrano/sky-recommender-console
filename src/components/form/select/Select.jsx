import React from 'react';
import { styled } from '@mui/system';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { useField, useFormikContext } from 'formik';

const SelectWrapper = styled('div')((props) => ({
  width: props.size && props.size === 'medium' ? '150px' : '120px',
}));

const Select = ({ name, options, size, ...otherProps }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const handleChange = (evt) => {
    const { value } = evt.target;
    setFieldValue(name, value);
  };

  const configSelect = {
    ...field,
    ...otherProps,
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
    <SelectWrapper size={size}>
      <TextField {...configSelect} size="small">
        {Object.keys(options).map((item, pos) => {
          return (
            <MenuItem key={pos} value={item}>
              {options[item]}
            </MenuItem>
          );
        })}
      </TextField>
    </SelectWrapper>
  );
};

export default Select;
