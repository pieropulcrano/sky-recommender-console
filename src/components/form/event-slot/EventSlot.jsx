import React from 'react';
import PropTypes from 'prop-types';
import { useField, useFormikContext } from 'formik';
import { formatToHumanReadable } from '../../../utils/date';
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
import { Tooltip } from '@material-ui/core';

const EventSlot = ({ name, handleOpen, hd, disabled, customClass }) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();
  const { value } = field;

  const rmvEvent = () => setFieldValue(name, {});

  const handleOpenModal = () => handleOpen(name);

  return value && Object.keys(value).length !== 0 ? (
    <SlotWrapper className={customClass} data-test={value.id}>
      <EventImageWrapper>
        {hd && <HD />}
        {!disabled && (
          <XButton onClick={rmvEvent}>
            <ClearIcon color="error" fontSize="small" />
          </XButton>
        )}
        {value.warningMessage && (
          <Tooltip title={value.warningMessage}>
            <Warning />
          </Tooltip>
        )}
        <EventImage />
      </EventImageWrapper>
      <Typography data-test="event-title" noWrap sx={{ fontSize: '12px' }}>
        {value.title && <span>{<b>{value.title}</b>}</span>}
      </Typography>
      <Typography
        data-test="event-startProgram"
        noWrap
        sx={{ fontSize: '12px' }}
      >
        {value.startProgram && formatToHumanReadable(value.startProgram)}
      </Typography>
      <Typography data-test="event-endProgram" noWrap sx={{ fontSize: '12px' }}>
        {value.endProgram && formatToHumanReadable(value.endProgram)}
      </Typography>
    </SlotWrapper>
  ) : (
    <SlotWrapper className="empity-slot">
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
