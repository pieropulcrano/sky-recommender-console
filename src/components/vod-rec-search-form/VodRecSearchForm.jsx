import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Marginer from '../marginer/Marginer';
import DataGridTable from '../form/data-grid-table/DataGridTable';
import TextInput from '../form/text-input/TextInput';
import {
  VodRecSearchFormWrapper,
  SelectButtonWrapper,
} from './VodRecSearchForm.styled';
import { validationSchema } from './validation';
import { initialValues, columns } from './config';

const VodRecSearchForm = ({
  onSubmit,
  onSearch,
  isSearching,
  searchResult,
}) => {
  return (
    <VodRecSearchFormWrapper>
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
              <Grid item xs={6}>
                <TextInput name="title" label="Title" />
              </Grid>

              <Grid item xs={6}>
                <Button
                  type="button"
                  variant="contained"
                  onClick={() => onSearch(values)}
                >
                  Search
                </Button>
              </Grid>

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
    </VodRecSearchFormWrapper>
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
