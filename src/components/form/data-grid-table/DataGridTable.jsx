import * as React from 'react';
import { styled } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';
import { useField, useFormikContext } from 'formik';

export default function DataGridDemo({ name, rows, columns, ...props }) {
  const [selectionModel, setSelectionModel] = React.useState([]);
  const [_, meta] = useField(name);
  const { setFieldValue } = useFormikContext();

  const ErrorMessage = styled('div')({
    fontSize: '12px',
    paddingTop: '5px',
    color: '#d32f2f',
  });

  return (
    <div style={{ height: 350, maxWidth: '100%', width: '800px' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={50}
        rowsPerPageOptions={[50]}
        checkboxSelection
        selectionModel={selectionModel}
        hideFooterSelectedRowCount
        onSelectionModelChange={(selection) => {
          if ((selection.length = 1)) {
            setFieldValue(
              name,
              rows.filter((row) => row.id === selection[0])[0],
            );
            setSelectionModel(selection);
          }
        }}
        {...props}
      />
      {meta.error ? (
        <ErrorMessage>Pick a value from the result list.</ErrorMessage>
      ) : null}
    </div>
  );
}
