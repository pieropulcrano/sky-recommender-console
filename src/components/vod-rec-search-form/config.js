import CellExpand from '../form/data-grid-table/CellExpand';
import { formatToHumanReadable } from '../../utils/date';

export const columns = [
  { field: 'title', headerName: 'Title', width: '150', renderCell: CellExpand },
  {
    field: 'startProgram',
    headerName: 'Start Date',
    type: 'dateTime',
    width: '180',
    valueFormatter: (params) => formatToHumanReadable(params.value),
  },
  {
    field: 'endProgram',
    headerName: 'End Date',
    type: 'dateTime',
    width: '180',
    valueFormatter: (params) => formatToHumanReadable(params.value),
  },
  {
    field: 'vodSummaryLong',
    headerName: 'Summary',
    width: '180',
    type: 'dateTime',
    renderCell: CellExpand,
  },
  { field: 'branding', headerName: 'Branding', width: '180' },
  { field: 'thumbnailType', headerName: 'Thumbnail Type', width: '180' },
  { field: 'verticalImageUrl', headerName: 'Vertical Image Url', width: '180' },
];

export const initialValues = {
  title: '',
  selectedEvent: null,
};
