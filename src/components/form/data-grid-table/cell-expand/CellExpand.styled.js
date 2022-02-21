import styled from '@emotion/styled';
import React from 'react';
import Typography from '@mui/material/Typography';
import Popper from '@mui/material/Popper';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

const BoxWrapper = React.forwardRef((props, ref) => (
  <Box ref={ref} {...props} />
));

export const GridCellExpandWrapper = styled(BoxWrapper)`
  display: flex;
  align-items: center;
  position: relative;
  height: 1;
  width: 1;
  line-height: 24px;
`;

export const CellDiv = styled(BoxWrapper)`
  display: block;
  position: absolute;
  height: 1;
  width: ${({ width }) => width};
  top: 50px;
  right: -50%;
`;

export const CellValue = styled(BoxWrapper)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const CellPopper = styled((props) => <Popper {...props} />)`
  width: ${({ width }) => width};
  z-index: 2000;
`;

export const PopperContent = styled((props) => <Paper {...props} />)`
  max-width: 500px;
`;

export const PopperValue = styled((props) => <Typography {...props} />)`
  padding: 8px;
`;
