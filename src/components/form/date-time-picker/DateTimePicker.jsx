import React from 'react';
import PropTypes from 'prop-types';
import { useField, useFormikContext } from 'formik';
import TextField from '@mui/material/TextField';
import DateTimePickerComp from '@mui/lab/DateTimePicker';

const DateTimePicker = ({ name, label, data_test, ...props }) => {
  const [field, meta] = useField(name);
  const { setFieldValue, setFieldTouched } = useFormikContext();

  const errors = {};

  // https://github.com/jaredpalmer/formik/issues/3051
  if (meta && meta.touched && meta.error) {
    errors.error = true;
    errors.helperText = meta.error;
  }

  const setDateTime = (value) => {
    setFieldTouched(name);
    setFieldValue(name, value);
  };

  const renderInput = (params) => (
    <TextField {...params} {...errors} size="small" />
  );

  return (
    <DateTimePickerComp
      renderInput={renderInput}
      label={label}
      inputFormat="dd/MM/yyyy h:mm a"
      value={field.value}
      onChange={setDateTime}
      data-testid={data_test}
      {...props}
    />
  );
};

DateTimePicker.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default DateTimePicker;
