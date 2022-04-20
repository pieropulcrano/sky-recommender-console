import React from 'react';
import PropTypes from 'prop-types';
import { useField, useFormikContext } from 'formik';
import { DataGridTableWrapper, DataTable } from './DataGridTable.styled';
import { ErrorMsg } from '../error-msg/ErrorMsg.styled';

/**
 * Table (connected with Formik state by the param "name") to display data.
 */

const MIN_ROWS = 25;
const MAX_ROWS = 50;

const DataGridTable = ({ name, rows, columns, ...props }) => {
  const [selectionModel, setSelectionModel] = React.useState([]);
  const [pageSize, setPageSize] = React.useState(MIN_ROWS);
  const { setFieldValue } = useFormikContext();
  const [, meta] = useField(name);

  const handlePageSizeChange = (newPageSize) => setPageSize(newPageSize);

  const handleSelectionModelChange = (selection) => {
    if (selection.length > 1) {
      const selectionSet = new Set(selectionModel);
      const result = selection.filter((s) => !selectionSet.has(s));
      setSelectionModel(result);
      setFieldValue(name, rows.filter((row) => row.id === result[0])[0]);
    } else {
      setSelectionModel(selection);
      setFieldValue(name, rows.filter((row) => row.id === selection[0])[0]);
    }
  };

  return (
    <DataGridTableWrapper>
      <DataTable
        rows={rows}
        columns={columns}
        pageSize={pageSize}
        rowsPerPageOptions={[MIN_ROWS, MAX_ROWS]}
        checkboxSelection
        hideFooterSelectedRowCount
        onPageSizeChange={handlePageSizeChange}
        selectionModel={selectionModel}
        onSelectionModelChange={handleSelectionModelChange}
        renderAsync={true}
        {...props}
        sx={{
          '& .MuiDataGrid-columnHeaders': {
            borderTopLeftRadius: '0px',
            borderTopRightRadius: '0px',
          },
        }}
      />
      {meta.error && <ErrorMsg>Pick a value from the result list.</ErrorMsg>}
    </DataGridTableWrapper>
  );
};

DataGridTable.propTypes = {
  /**
   * The field name that connects the table with the form state.
   */
  name: PropTypes.string.isRequired,
  /**
   * The data displayed by the table.
   */
  rows: PropTypes.array.isRequired,
  /**
   * The configuration of all the columns of the table.
   */
  columns: PropTypes.array.isRequired,
};

export default DataGridTable;
