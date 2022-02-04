import { styled } from '@mui/system';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import IconButton from '@mui/material/IconButton';
import HdIcon from '@material-ui/icons/Hd';
import SdIcon from '@mui/icons-material/Sd';
import Box from '@mui/material/Box';

export const SlotWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  width: '100px',
  maxHeight: '200px',
  marginRight: '10px ',
});

export const EventImageWrapper = styled(Box)(({ error }) => ({
  width: '100px',
  height: '140px',
  backgroundColor: '#fff',
  border: error && '1px solid #d32f2f',
  position: 'relative',
}));

export const EventImage = styled('div')(({ url }) => ({
  height: '100%',
  width: '100%',
  border: '1px solid #ccc',
  backgroundImage: url
    ? `url(${url})`
    : `url(https://via.placeholder.com/100x140)`,
}));

export const HD = styled(HdIcon)({
  position: 'absolute',
  left: '0',
  top: '0',
  color: 'blue',
});

export const SD = styled(SdIcon)({
  position: 'absolute',
  left: '0',
  top: '0',
  color: 'black',
});

export const XButton = styled(IconButton)({
  position: 'absolute',
  padding: '0',
  right: '0',
  top: '0',
});

export const Warning = styled(ReportProblemIcon)({
  position: 'absolute',
  right: 0,
  bottom: 0,
  color: 'orange',
});

export const EmptyEventWrapper = styled(Box)(({ error }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100px',
  height: '140px',
  border: !error && '1px solid #ccc',
}));
