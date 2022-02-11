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
  SD,
  Warning,
  ImageNotAvailable,
} from './EventSlot.styled';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import { Tooltip } from '@material-ui/core';

/**
 * Component to display an assigned event or select a new one, connected with Formik state by the param "name"
 */

const EventSlot = ({ name, handleOpen, type, disabled, data_test_slot }) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();
  const { value } = field;

  const rmvEvent = () => setFieldValue(name, {});

  const handleOpenModal = () => handleOpen(name);

  return value && Object.keys(value).length !== 0 ? (
    <SlotWrapper data-test-slot={data_test_slot} data-test={value.id}>
      <EventImageWrapper>
        {type && type === 'sd' ? <SD /> : type === 'hd' ? <HD /> : null}
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
        {(value.verticalImageUrl && (
          <EventImage src={value.verticalImageUrl} />
        )) || (
          <EmptyEventWrapper>
            <ImageNotAvailable />
          </EmptyEventWrapper>
        )}
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
        {type && type === 'sd' ? <SD /> : type === 'hd' ? <HD /> : null}
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
  type: undefined,
  disabled: false,
};

EventSlot.propTypes = {
  /**
   * The field name that connects the table with the Formik state.
   */
  name: PropTypes.string.isRequired,
  /**
   * Gets called when the user click on the add button.
   */
  handleOpen: PropTypes.func.isRequired,
  /**
   * Indicates the type of the event assigned to the slot.
   */
  type: PropTypes.oneOf(['sd', 'hd']),
  /**
   * Disable all possible interaction with the component (add / remove event).
   */
  disabled: PropTypes.bool,
};

export default EventSlot;
