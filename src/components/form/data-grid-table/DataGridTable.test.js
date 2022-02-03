import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import DataGridTable from './DataGridTable';

describe('DataGridTable', () => {
  const props = {
    name: 'data-table',
    rows: [
      { id: '1', field_1: 'field-1', field_2: 'field_2', field_3: 'field_3' },
    ],
    columns: [
      { field: 'field_1', headerName: 'field-1', width: '150' },
      { field: 'field_2', headerName: 'field-2', width: '150' },
      { field: 'field_3', headerName: 'field-3', width: '150' },
    ],
  };

  const initialValues = {
    selectedEvent: null,
  };

  const validationSchema = Yup.object().shape({
    selectedEvent: Yup.object().required(),
  });

  it('should render', () => {
    render(
      <Formik initialValues={initialValues} validationSchema={validationSchema}>
        <DataGridTable {...props} />
      </Formik>,
    );

    expect(document.body.childNodes[0].children).toMatchSnapshot();
  });

  it("should allow user to select a value from the result's list", async () => {
    render(
      <Formik initialValues={initialValues} validationSchema={validationSchema}>
        <DataGridTable {...props} />
      </Formik>,
    );

    const rowCheckBox = screen.queryByLabelText('Select Row checkbox');
    await waitFor(() => {
      fireEvent.click(rowCheckBox);
    });

    expect(rowCheckBox.checked).toEqual(true);

    await waitFor(() => {
      fireEvent.click(rowCheckBox);
    });

    expect(rowCheckBox.checked).toEqual(false);
  });
});
