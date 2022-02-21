import CellExpand from '../form/data-grid-table/cell-expand/CellExpand';
import { formatToHumanReadable } from '../../utils/date';

/**
 * Config passed to the DataGridTable columns.
 */

export const columns = [
  { field: 'title', headerName: 'Title', width: '150', renderCell: CellExpand },
  {
    field: 'startProgram',
    headerName: 'Start Date',
    type: 'dateTime',
    width: '180',
    valueFormatter: (params) =>
      params.value && formatToHumanReadable(params.value),
  },
  {
    field: 'endProgram',
    headerName: 'End Date',
    type: 'dateTime',
    width: '180',
    valueFormatter: (params) =>
      params.value && formatToHumanReadable(params.value),
  },
  {
    field: 'linearSummaryLong',
    headerName: 'Summary',
    width: '180',
    renderCell: CellExpand,
  },
  { field: 'channel', headerName: 'Channel', width: '180' },
  { field: 'resolution', headerName: 'Resolution', width: '180' },
  { field: 'thumbnailType', headerName: 'Thumbnail Type', width: '180' },
  { field: 'verticalImageUrl', headerName: 'Vertical Image Url', width: '180' },
];

/**
 * Config passed to the form.
 */

export const initialValues = {
  selectedEvent: null,
};
