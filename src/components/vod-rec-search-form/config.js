import CellExpand from '../form/data-grid-table/CellExpand';

export const columns = [
  { field: 'title', headerName: 'Title', width: '150', renderCell: CellExpand },
  { field: 'startDate', headerName: 'Start Date', width: '180' },
  { field: 'endDate', headerName: 'End Date', width: '180' },
  {
    field: 'synopsis',
    headerName: 'Synopsis',
    width: '180',
    renderCell: CellExpand,
  },
  { field: 'branding', headerName: 'Branding', width: '180' },
];
