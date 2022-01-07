import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Marginer from '../marginer/Marginer';
import DataGridTable from '../form/data-grid-table/DataGridTable';
import DateTimePicker from '../form/date-time-picker/DateTimePicker';
import TextInput from '../form/text-input/TextInput';
import {
  LinRecSearchFormWrapper,
  SelectButtonWrapper,
} from './LinRecSearchForm.styled';
import { initialValues, validationSchema } from './validation';
import { columns } from './config';

const VodRecSearchForm = ({
  onSubmit,
  onSearch,
  isSearching,
  searchResult,
  resolution,
}) => {
  const searchEvent = (values, resolution) => () => {
    const params = {};
    if (values.title) params.title = values.title;
    if (values.startDateTime)
      params.startProgram_gte = values.startDateTime.toISOString();

    if (Object.values(params).length === 0) return;

    return onSearch({
      ...params,
      type: 'LIN',
      resolution,
    });
  };

  return (
    <LinRecSearchFormWrapper>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ values }) => (
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
                <Button
                  type="button"
                  variant="contained"
                  onClick={searchEvent(values, resolution)}
                >
                  Search
                </Button>
              </Grid>

              <Grid item xs={6} />

              <Grid item xs={12}>
                <DataGridTable
                  name="selectedEvent"
                  columns={columns}
                  loading={isSearching}
                  rows={searchResult}
                />
              </Grid>

              <Grid item xs={12}>
                <SelectButtonWrapper>
                  <Button type="submit" variant="contained" color="success">
                    Select
                  </Button>
                </SelectButtonWrapper>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </LinRecSearchFormWrapper>
  );
};

VodRecSearchForm.defaultProps = {
  searchResult: [],
};

VodRecSearchForm.propTypes = {
  searchResult: PropTypes.array,
  isSearching: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default VodRecSearchForm;
