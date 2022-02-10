import React from 'react';
import PropTypes from 'prop-types';
import { useField, useFormikContext } from 'formik';
import { DataGrid } from '@mui/x-data-grid';
import { DataGridTableWrapper } from './DataGridTable.styled';
import { ErrorMsg } from '../error-msg/ErrorMsg.styled';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    '& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer':
      {
        display: 'none',
      },
  },
}));

/**
 * Table (connected with Formik state by the param "name") to display data.
 */

const DataGridTable = ({ name, rows, columns, ...props }) => {
  const [selectionModel, setSelectionModel] = React.useState([]);
  const [pageSize, setPageSize] = React.useState(25);
  // eslint-disable-next-line no-unused-vars
  const [_, meta] = useField(name);
  const { setFieldValue } = useFormikContext();

  const classes = useStyles();

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
        className={classes.root}
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
