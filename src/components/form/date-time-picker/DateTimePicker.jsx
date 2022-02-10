import React from 'react';
import PropTypes from 'prop-types';
import { useField, useFormikContext } from 'formik';
import TextField from '@mui/material/TextField';
import DateTimePickerComp from '@mui/lab/DateTimePicker';

/**
 * Component to pick a date and a time, connected with Formik state by the param "name".
 */

const DateTimePicker = ({ name, label, data_test, ...props }) => {
  const [field, meta] = useField(name);
  const { setFieldValue, setFieldTouched } = useFormikContext();

  const errors = {};

  /**
   * @see https://github.com/jaredpalmer/formik/issues/3051
   * */

  if (meta && meta.touched && meta.error) {
    errors.error = true;
    errors.helperText = meta.error;
  }

  const setDateTime = (value) => {
    setFieldTouched(name);
    setFieldValue(name, value);
  };

  const handleBlur = () => setFieldTouched(name);

  const renderInput = (params) => (
    <TextField {...params} {...errors} onBlur={handleBlur} size="small" />
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
