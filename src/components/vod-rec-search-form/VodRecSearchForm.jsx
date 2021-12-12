import React from 'react';
import { Formik, Form } from 'formik';
import { styled } from '@mui/material';
import { columns } from './config';
import { initialValues, validationSchema } from './validation';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Marginer from '../marginer/Marginer';
import DataGridTable from '../form/data-grid-table/DataGridTable';
import TextInput from '../form/text-input/TextInput';

const VodRecSearchFormWrapper = styled('div')({
  width: '100%',
  height: '100%',
  maxWidth: '800px',
});

const SelectButtonWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'flex-end',
});

const VodRecSearchForm = ({
  onSubmit,
  onSearch,
  isSearching,
  searchResult,
}) => {
  const searchEvent = (values) => {
    const params = {};
    if (values.title) params.title = values.title;
    if (Object.values(params).every((key) => key === undefined)) return;
    return onSearch(params);
  };

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
                  onClick={() => searchEvent(values)}
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
    </VodRecSearchFormWrapper>
  );
};

export default VodRecSearchForm;
