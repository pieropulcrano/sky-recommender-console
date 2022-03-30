import CellExpand from '../form/data-grid-table/cell-expand/CellExpand';
import { formatToHumanReadable } from '../../utils/date';

export const columns = [
  { field: 'title', headerName: 'Title', width: '200', renderCell: CellExpand },
  {
    field: 'startProgram',
    headerName: 'Start Date',
    type: 'dateTime',
    width: '150',
    valueFormatter: (params) =>
      params.value && formatToHumanReadable(params.value),
  },
  {
    field: 'endProgram',
    headerName: 'End Date',
    type: 'dateTime',
    width: '150',
    valueFormatter: (params) =>
      params.value && formatToHumanReadable(params.value),
  },
  {
    field: 'vodSummaryLong',
    headerName: 'Summary',
    width: '200',
    type: 'dateTime',
    renderCell: CellExpand,
  },
  {
    field: 'branding',
    headerName: 'Branding',
    width: '100',
    renderCell: CellExpand,
  },
  { field: 'thumbnailType', headerName: 'Thumbnail Type', width: '150' },
  {
    field: 'verticalImageUrl',
    headerName: 'Vertical Image Url',
    width: '150',
    renderCell: CellExpand,
  },
];

export const initialValues = {
  title: '',
  selectedEvent: null,
};
