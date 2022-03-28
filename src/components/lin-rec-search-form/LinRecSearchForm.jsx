import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Marginer from '../marginer/Marginer';
import DataGridTable from '../form/data-grid-table/DataGridTable';
import LinEventSearchForm from '../lin-event-search-form/LinEventSearchForm';
import {
  RecSearchFormWrapper,
  RigthButtonWrapper,
} from '../common/Common.styled';
import { validationSchema } from './validation';
import { initialValues, columns } from './config';

/**
 * Component to search and fill a slot of the lin recommendation form with a lin event.
 */

const LinRecSearchForm = ({
  onSubmit,
  onSearch,
  isSearching,
  searchResult,
  initialStartDateTime,
}) => {
  return (
    <RecSearchFormWrapper>
      <LinEventSearchForm
        onSubmit={onSearch}
        initialStartDateTime={initialStartDateTime}
      />
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
                initialState={{
                  sorting: {
                    sortModel: [
                      {
                        field: 'startProgram',
                        sort: 'asc',
                      },
                    ],
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <RigthButtonWrapper>
                <Button type="submit" variant="contained" color="success">
                  Select
                </Button>
              </RigthButtonWrapper>
            </Grid>
          </Grid>
        </Form>
      </Formik>
    </RecSearchFormWrapper>
  );
};

LinRecSearchForm.defaultProps = {
  searchResult: [],
};

LinRecSearchForm.propTypes = {
  searchResult: PropTypes.array,
  /**
   * The form is performing a search operation
   */
  isSearching: PropTypes.bool.isRequired,
  /**
   * Callback function called when the user clicks on the submit button.
   */
  onSubmit: PropTypes.func.isRequired,
  /**
   * allback function called when the user clicks on the search button.
   */
  onSearch: PropTypes.func.isRequired,
  /**
   *   Start date time selected for create Linear rec.
   */
  initialStartDateTime: PropTypes.string,
};

export default LinRecSearchForm;
