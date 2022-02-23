import React from 'react';
import styled from '@emotion/styled';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import HdIcon from '@material-ui/icons/Hd';
import SdIcon from '@mui/icons-material/Sd';
import Box from '@mui/material/Box';

export const SlotWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100px;
  max-height: 200px;
  margin-right: 10px;
`;

export const EventImageWrapper = styled(Box)`
  position: relative;
  width: 100px;
  height: 140px;
  background-color: #fff;
  border: ${({ error }) => error && '1px solid #d32f2f'};
`;

export const EventImage = styled.img`
  width: 100%;
  height: 100%;
`;

export const HD = styled(HdIcon)`
  position: absolute;
  left: 0;
  bottom: 0;
  color: blue;
`;

export const SD = styled(SdIcon)`
  position: absolute;
  left: 0;
  bottom: 0;
  color: black;
`;

export const ImageNotAvailable = styled(ImageNotSupportedIcon)`
  position: absolute;
  left: 0;
  top: 0;
  color: #d3d3d3;
`;

export const XButton = styled((props) => <IconButton {...props} />)`
  position: absolute;
  padding: 0;
  right: 0;
  top: 0;
`;

export const AddIcon = styled((props) => <AddCircleIcon {...props} />)`
  color: blue;
`;

export const Warning = styled(ReportProblemIcon)`
  position: absolute;
  right: 0;
  bottom: 0;
  color: orange;
`;

export const EmptyEventWrapper = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 140px;
  border: ${({ error }) => !error && '1px solid #ccc'};
`;

const Title = React.forwardRef((props, ref) => (
  <Typography {...props} ref={ref} />
));

export const EventTitle = styled(Title)`
  font-size: 12px;
  font-weight: bold;
`;

export const EventDateTime = styled((props) => <Typography {...props} />)`
  font-size: 12px;
`;
