import React from 'react';
import PropTypes from 'prop-types';
import { useField, useFormikContext } from 'formik';
import TextField from '@mui/material/TextField';
import DateTimePickerComp from '@mui/lab/DateTimePicker';
import { resetSecondsToZero } from '../../../utils/date';

const DateTimePicker = ({ name, label, ...props }) => {
  const [field, meta] = useField(name);
  const { setFieldValue, setFieldTouched } = useFormikContext();

  const errors = {};

  if (meta && meta.touched && meta.error) {
    errors.error = true;
    errors.helperText = 'Invalid Date';
  }
  const handleFieldTouched = () => setFieldTouched(name);

  const setDateTime = (value) => {
    let date = resetSecondsToZero(value);
    setFieldValue(name, date.toISOString());
  };

  const renderInput = (params) => (
    <TextField
      {...params}
      {...errors}
      onChange={handleFieldTouched}
      size="small"
    />
  );

  return (
    <DateTimePickerComp
      renderInput={renderInput}
      label={label}
      disablePast
      inputFormat="dd/MM/yyyy h:mm a"
      value={field.value}
      onChange={setDateTime}
      {...props}
    />
  );
};

DateTimePicker.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default DateTimePicker;
