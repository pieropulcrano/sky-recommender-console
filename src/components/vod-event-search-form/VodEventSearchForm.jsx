import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextInput from '../form/text-input/TextInput';
import { validationSchema } from './validation';
import { initialValues } from './config';

const VodEventSearchForm = ({ onSubmit }) => {
  const handleSubmit = (values) => onSubmit(values);
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <Form>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextInput name="title" label="Title" />
          </Grid>
          <Grid item xs={6}>
            <Button type="submit" variant="contained">
              Search
            </Button>
          </Grid>
        </Grid>
      </Form>
    </Formik>
  );
};

VodEventSearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default VodEventSearchForm;
