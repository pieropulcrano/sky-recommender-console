import React from 'react';
import { useField, useFormikContext } from 'formik';
import { styled } from '@mui/system';
import { isExpired } from '../../../utils/date';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import HdIcon from '@material-ui/icons/Hd';

const SlotWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  width: '100px',
  height: '200px',
  marginRight: '10px ',
});

const EventImageWrapper = styled('div')(({ error }) => ({
  width: '100px',
  height: '140px',
  backgroundColor: '#fff',
  border: error ? '1px solid #d32f2f' : null,
  position: 'relative',
}));

const EventImage = styled('div')(({ url }) => ({
  height: '100%',
  width: '100%',
  backgroundImage: url
    ? `url(${url})`
    : `url(https://via.placeholder.com/100x140)`,
}));

const HD = styled(HdIcon)({
  position: 'absolute',
  left: '0',
  top: '0',
  color: 'blue',
});

const XButton = styled(IconButton)({
  position: 'absolute',
  padding: '0',
  right: '0',
  top: '0',
});

const Warning = styled(ReportProblemIcon)({
  position: 'absolute',
  right: 0,
  bottom: 0,
  color: 'orange',
});

const EmptyEventWrapper = styled('div')(({ error }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100px',
  height: '140px',
  border: error ? null : '1px solid #ccc',
}));

const EventSlot = ({ name, handleOpen, hd }) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();
  const { value } = field;

  const rmvEvent = () => setFieldValue(name, null);

  return value && Object.keys(value).length > 0 ? (
    <SlotWrapper>
      <EventImageWrapper>
        {hd && <HD />}
        <XButton onClick={rmvEvent}>
          <ClearIcon color="error" fontSize="small" />
        </XButton>
        {isExpired(value.endDate) && <Warning />}
        <EventImage />
      </EventImageWrapper>
      <Typography noWrap sx={{ fontSize: '12px' }}>
        {value.title ? <span>{<b>{value.title.split('T')[0]}</b>}</span> : null}
      </Typography>
      <Typography noWrap sx={{ fontSize: '12px' }}>
        {value.startDate ? (
          <span>
            <b>Start: </b>
            {value.startDate.split('T')[0]}
          </span>
        ) : null}
      </Typography>
      <Typography noWrap sx={{ fontSize: '12px' }}>
        {value.endDate ? (
          <span>
            <b>End: </b>
            {value.endDate.split('T')[0]}
          </span>
        ) : null}
      </Typography>
    </SlotWrapper>
  ) : (
    <SlotWrapper>
      <EventImageWrapper error={meta && meta.touched && meta.error ? 1 : 0}>
        <EmptyEventWrapper error={meta && meta.touched && meta.error ? 1 : 0}>
          <IconButton
            onClick={() => {
              handleOpen(name);
            }}
          >
            <AddCircleIcon color="primary" fontSize="large" />
          </IconButton>
        </EmptyEventWrapper>
      </EventImageWrapper>
    </SlotWrapper>
  );
};

export default EventSlot;
