import React from 'react';
import PropTypes from 'prop-types';
import { useField, useFormikContext } from 'formik';
import { isExpired, formatToHumanReadable } from '../../../utils/date';
import {
  SlotWrapper,
  EventImageWrapper,
  XButton,
  EventImage,
  EmptyEventWrapper,
  HD,
  Warning,
} from './EventSlot.styled';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';

const EventSlot = ({ name, handleOpen, hd, disabled }) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();
  const { value } = field;

  const rmvEvent = () => setFieldValue(name, {});

  const handleOpenModal = () => handleOpen(name);

  return value && Object.keys(value).length !== 0 ? (
    <SlotWrapper>
      <EventImageWrapper>
        {hd && <HD />}
        {!disabled && (
          <XButton onClick={rmvEvent}>
            <ClearIcon color="error" fontSize="small" />
          </XButton>
        )}
        {value.endProgram && isExpired(value.endProgram) && <Warning />}
        <EventImage />
      </EventImageWrapper>
      <Typography noWrap sx={{ fontSize: '12px' }}>
        {value.title && <span>{<b>{value.title}</b>}</span>}
      </Typography>
      <Typography noWrap sx={{ fontSize: '12px' }}>
        {value.startProgram && formatToHumanReadable(value.startProgram)}
      </Typography>
      <Typography noWrap sx={{ fontSize: '12px' }}>
        {value.endProgram && formatToHumanReadable(value.endProgram)}
      </Typography>
    </SlotWrapper>
  ) : (
    <SlotWrapper>
      <EventImageWrapper error={meta && meta.touched && meta.error}>
        {hd && <HD />}
        <EmptyEventWrapper error={meta && meta.touched && meta.error}>
          {!disabled && (
            <IconButton onClick={handleOpenModal}>
              <AddCircleIcon style={{ color: 'blue' }} fontSize="large" />
            </IconButton>
          )}
        </EmptyEventWrapper>
      </EventImageWrapper>
    </SlotWrapper>
  );
};

EventSlot.defaultProps = {
  hd: false,
  disabled: false,
};

EventSlot.propTypes = {
  name: PropTypes.string.isRequired,
  handleOpen: PropTypes.func.isRequired,
  hd: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default EventSlot;
