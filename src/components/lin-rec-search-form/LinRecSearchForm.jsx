import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Marginer from '../marginer/Marginer';
import DataGridTable from '../form/data-grid-table/DataGridTable';
import LinEventSearchForm from '../lin-event-search-form/LinEventSearchForm';
import {
  LinRecSearchFormWrapper,
  SelectButtonWrapper,
} from './LinRecSearchForm.styled';
import { validationSchema } from './validation';
import { initialValues, columns } from './config';

const LinRecSearchForm = ({
  onSubmit,
  onSearch,
  isSearching,
  searchResult,
}) => {
  return (
    <LinRecSearchFormWrapper>
      <LinEventSearchForm onSubmit={onSearch} />
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form>
          <Marginer direction="horizontal" margin={10} />
          <Grid container spacing={2}>
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
      </Formik>
    </LinRecSearchFormWrapper>
  );
};

LinRecSearchForm.defaultProps = {
  searchResult: [],
};

LinRecSearchForm.propTypes = {
  searchResult: PropTypes.array,
  isSearching: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default LinRecSearchForm;
