import { styled } from '@mui/material';

export const VodRecSearchFormWrapper = styled('div')({
  width: '100%',
  height: '100%',
  maxHeight: '600px',
  maxWidth: '1000px',
});

export const SelectButtonWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'flex-end',
});

export const initialValues = {
  title: '',
  selectedEvent: null,
};
