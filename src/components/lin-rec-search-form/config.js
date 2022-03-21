import CellExpand from '../form/data-grid-table/cell-expand/CellExpand';
import { formatToHumanReadable } from '../../utils/date';

/**
 * Config passed to the DataGridTable columns.
 */

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
    field: 'linearSummaryLong',
    headerName: 'Summary',
    width: '200',
    renderCell: CellExpand,
  },
  { field: 'channelName', headerName: 'Channel', width: '200' },
  { field: 'thumbnailType', headerName: 'Thumbnail Type', width: '150' },
  {
    field: 'verticalImageUrl',
    headerName: 'Vertical Image Url',
    width: '150',
    renderCell: CellExpand,
  },
];

/**
 * Config passed to the form.
 */

export const initialValues = {
  selectedEvent: null,
};
