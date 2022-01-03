import { styled } from '@mui/material';

const shared = {
  display: 'flex',
  justifyContent: 'space-between',
};

export const VocRecFormWrapper = styled('div')({
  maxWidth: '100%',
  width: '700px',
  height: '100%',
  maxHeight: '600px',
  paddingTop: '10px',
});

export const SlotsRowWrapper = styled('div')(shared);

export const ButtonsWrapper = styled('div')(shared);

export const LeftButtons = styled('div')(shared);
