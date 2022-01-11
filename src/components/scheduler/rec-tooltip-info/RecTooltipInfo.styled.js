import { styled } from '@mui/material';

const shared = {
  display: 'flex',
  flexDirection: 'column',
  widh: '100%',
};

export const TooltipContentWrapper = styled('div')(shared);

export const RecInfoWrapper = styled('div')(shared);

export const TooltipWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'flex-start',
  widh: '100%',
});
