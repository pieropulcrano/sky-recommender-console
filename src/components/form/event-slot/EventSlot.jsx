import React from 'react';
import PropTypes from 'prop-types';
import { useField, useFormikContext } from 'formik';
import { formatToHumanReadable } from '../../../utils/date';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import { Tooltip } from '@material-ui/core';
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
  EventTitle,
  EventDateTime,
  AddIcon,
} from './EventSlot.styled';

/**
 * Component to display an assigned event or select a new one, connected with Formik state by the param "name"
 */

const SLOT_TYPE_HD = 'hd';
const SLOT_TYPE_SD = 'sd';

const EventSlot = ({ name, handleOpen, type, disabled, data_test_slot }) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();
  const { value } = field;

  const rmvEvent = () => setFieldValue(name, {});

  const handleOpenModal = () => handleOpen(name);

  if (!value || Object.keys(value).length === 0) {
    return (
      <SlotWrapper className="empity-slot">
        <EventImageWrapper error={meta && meta.touched && meta.error}>
          {type === SLOT_TYPE_SD ? <SD /> : type === SLOT_TYPE_HD && <HD />}
          <EmptyEventWrapper error={meta && meta.touched && meta.error}>
            {!disabled && (
              <IconButton onClick={handleOpenModal}>
                <AddIcon fontSize="large" />
              </IconButton>
            )}
          </EmptyEventWrapper>
        </EventImageWrapper>
      </SlotWrapper>
    );
  }

  return (
    <SlotWrapper data-test-slot={data_test_slot} data-test={value.id}>
      <EventImageWrapper>
        {type === SLOT_TYPE_SD ? <SD /> : type === SLOT_TYPE_HD && <HD />}
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
      {value.title && (
        <Tooltip title={value.title}>
          <EventTitle data-test="event-title" noWrap>
            {value.title}
          </EventTitle>
        </Tooltip>
      )}
      <EventDateTime data-test="event-startProgram" noWrap>
        {value.startProgram && formatToHumanReadable(value.startProgram)}
      </EventDateTime>
      <EventDateTime data-test="event-endProgram" noWrap>
        {value.endProgram && formatToHumanReadable(value.endProgram)}
      </EventDateTime>
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
  type: PropTypes.oneOf([SLOT_TYPE_SD, SLOT_TYPE_HD]),
  /**
   * Disable all possible interaction with the component (add / remove event).
   */
  disabled: PropTypes.bool,
};

export default EventSlot;
