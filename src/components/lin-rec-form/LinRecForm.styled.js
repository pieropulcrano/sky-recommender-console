import { styled } from '@mui/material';

const shared = {
  display: 'flex',
  justifyContent: 'space-between',
};

export const SlotsRowWrapper = styled('div')(shared);

export const LinRecFormWrapper = styled('div')({
  maxWidth: '100%',
  width: '720px',
  height: '100%',
  maxHeight: '600px',
  paddingTop: '10px',
});

export const ButtonsWrapper = styled('div')(shared);

export const LeftButtons = styled('div')(shared);
