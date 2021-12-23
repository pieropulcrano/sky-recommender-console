import CellExpand from '../form/data-grid-table/CellExpand';

export const columns = [
  { field: 'title', headerName: 'Title', width: '150', renderCell: CellExpand },
  { field: 'startProgram', headerName: 'Start Date', width: '180' },
  { field: 'endProgram', headerName: 'End Date', width: '180' },
  {
    field: 'vodSummaryLong',
    headerName: 'Summary',
    width: '180',
    renderCell: CellExpand,
  },
  { field: 'branding', headerName: 'Branding', width: '180' },
  { field: 'thumbnailType', headerName: 'Thumbnail Type', width: '180' },
  { field: 'verticalImageUrl', headerName: 'Vertical Image Url', width: '180' },
];
