import React from 'react';
import PropTypes from 'prop-types';
import { useField, useFormikContext } from 'formik';
import TextField from '@mui/material/TextField';
import Picker from '@mui/lab/DateTimePicker';

/**
 * Component to pick a date and a time, connected with Formik state by the param "name".
 */

const INPUT_FORMAT = 'dd/MM/yyyy HH:mm';

const DateTimePicker = ({ name, label, data_test, ...props }) => {
  const { setFieldValue, setFieldTouched } = useFormikContext();
  const [field, meta] = useField(name);

  const errors = {};

  if (meta && meta.touched && meta.error) {
    errors.error = true;
    errors.helperText = meta.error;
  }

  const handleBlur = () => setFieldTouched(name);

  const setDateTime = (value) => {
    setFieldTouched(name);
    setFieldValue(name, value);
  };

  const renderInput = (params) => (
    <TextField {...params} {...errors} onBlur={handleBlur} size="small" />
  );

  return (
    <Picker
      inputFormat={INPUT_FORMAT}
      ampm={false}
      renderInput={renderInput}
      label={label}
      value={field.value}
      onChange={setDateTime}
      data-testid={data_test}
      {...props}
    />
  );
};

DateTimePicker.propTypes = {
  /**
   * The field name that connects the table with the form state.
   */
  name: PropTypes.string.isRequired,
  /**
   * The label shown to the user
   */
  label: PropTypes.string.isRequired,
};

export default DateTimePicker;
