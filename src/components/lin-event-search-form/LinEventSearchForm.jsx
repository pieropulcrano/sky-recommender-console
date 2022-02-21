import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Marginer from '../marginer/Marginer';
import DateTimePicker from '../form/date-time-picker/DateTimePicker';
import TextInput from '../form/text-input/TextInput';
import { validationSchema } from './validation';
import { initialValues } from './config';

/**
 * Form to search a linear event.
 */

const LinEventSearchForm = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <Form>
        <Marginer direction="horizontal" margin={10} />
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextInput name="title" label="Title" />
          </Grid>
          <Grid item xs={4}>
            <DateTimePicker name="startDateTime" label="Start Date" />
          </Grid>
          <Grid item xs={4}>
            <Button type="submit" variant="contained">
              Search
            </Button>
          </Grid>
        </Grid>
      </Form>
    </Formik>
  );
};

LinEventSearchForm.propTypes = {
  /**
   * Callback function called when the user click on the onSubmit button
   */
  onSubmit: PropTypes.func.isRequired,
};

export default LinEventSearchForm;
