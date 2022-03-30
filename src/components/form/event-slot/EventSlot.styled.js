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
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EventBusyIcon from '@mui/icons-material/EventBusy';

export const SlotWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 111px;
  max-height: 223px;
  margin-right: 10px;
`;

export const EventImageWrapper = styled(Box)`
  position: relative;
  width: 111px;
  height: 163.79px;
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
  background-color: #2c3e50;
`;

export const AddIcon = styled((props) => <AddCircleIcon {...props} />)`
  color: blue;
`;

export const AddIconDisabled = styled((props) => <AddCircleIcon {...props} />)`
  color: grey;
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
  width: 111px;
  height: 163.79px;
  border: ${({ error }) => !error && '1px solid #ccc'};
`;

const Title = React.forwardRef((props, ref) => (
  <Typography {...props} ref={ref} />
));

export const EventTitle = styled(Title)`
  font-size: 12px;
  font-weight: bold;
`;

export const EventChannel = styled(Title)`
  font-size: 12px;
`;

export const EventDateTime = styled((props) => <Typography {...props} />)`
  margin-left: 5px;
  font-size: 11px;
`;

export const StartDateIcon = styled(EventAvailableIcon)`
  font-size: 16px !important;
  bottom: 0;
  color: #2e7d32;
`;
export const EndDateIcon = styled(EventBusyIcon)`
  font-size: 16px !important;
  bottom: 0;
  color: #d32f2f;
`;
