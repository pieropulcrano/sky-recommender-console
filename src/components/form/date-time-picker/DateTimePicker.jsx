import * as React from 'react';
import { useField, useFormikContext } from 'formik';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';

const DatePicker = ({ name, label, ...props }) => {
  const [field, meta] = useField(name);
  const { setFieldValue, setFieldTouched } = useFormikContext();

  const errors = {};

  if (meta && meta.touched && meta.error) {
    errors.error = true;
    errors.helperText = 'Invalid Date';
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        renderInput={(params) => (
          <TextField
            {...params}
            {...errors}
            onChange={() => setFieldTouched(name)}
            size="small"
          />
        )}
        label={label}
        disablePast
        inputFormat="dd/MM/yyyy h:mm a"
        value={field.value}
        onChange={(value) => setFieldValue(name, value)}
        {...props}
      />
    </LocalizationProvider>
  );
};

export default DatePicker;
