import React from 'react';
import PropTypes from 'prop-types';
import { useField, useFormikContext } from 'formik';
import { DataGrid } from '@mui/x-data-grid';
import { ErrorMessage, DataGridTableWrapper } from './DataGridTable.styled';

const DataGridTable = ({ name, rows, columns, ...props }) => {
  const [selectionModel, setSelectionModel] = React.useState([]);
  const [pageSize, setPageSize] = React.useState(25);
  // eslint-disable-next-line no-unused-vars
  const [_, meta] = useField(name);
  const { setFieldValue } = useFormikContext();

  const handlePageSizeChange = (newPageSize) => setPageSize(newPageSize);

  const handleSelectionModelChange = (selection) => {
    if (selection.length > 1) {
      const selectionSet = new Set(selectionModel);
      const result = selection.filter((s) => !selectionSet.has(s));
      setSelectionModel(result);
    } else {
      setSelectionModel(selection);
      setFieldValue(name, rows.filter((row) => row.id === selection[0])[0]);
    }
  };

  return (
    <DataGridTableWrapper>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={pageSize}
        rowsPerPageOptions={[25, 50]}
        checkboxSelection
        hideFooterSelectedRowCount
        onPageSizeChange={handlePageSizeChange}
        selectionModel={selectionModel}
        onSelectionModelChange={handleSelectionModelChange}
        {...props}
      />
      {meta.error && (
        <ErrorMessage>Pick a value from the result list.</ErrorMessage>
      )}
    </DataGridTableWrapper>
  );
};

DataGridTable.propTypes = {
  name: PropTypes.string.isRequired,
  rows: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
};

export default DataGridTable;
