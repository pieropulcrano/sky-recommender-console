import styled from '@emotion/styled';
import { DataGrid } from '@mui/x-data-grid';

export const DataGridTableWrapper = styled.div`
  height: 400px;
  maxwidth: 100%;
  width: 1000px;
`;

export const DataGridT = styled(DataGrid)`
  .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer {
    display: none;
  }
`;
