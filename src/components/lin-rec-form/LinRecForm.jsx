import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import Grid from '@mui/material/Grid';
import Select from '../form/select/Select';
import EventSlot from '../form/event-slot/EventSlot';
import ClearBtn from '../form/clear-btn/ClearBtn';
import LoadingButton from '@mui/lab/LoadingButton';
import SearchLinRec from '../../containers/search-lin-rec/SearchLinRec';
import Modal from '../modal/Modal';
import { isEditingValidationSchema, validationSchema } from './validation';
import {
  SlotsRowWrapper,
  LinRecFormWrapper,
  LeftButtons,
  ButtonsWrapper,
} from './LinRecForm.styled';
import Marginer from '../marginer/Marginer';
import DateTimePicker from '../form/date-time-picker/DateTimePicker';
import { clusters, DEFAULT_VALUES } from './config';
import { slotTypes } from '../form/event-slot/EventSlot.types';
import { isExpired, nowIsBetweenTwoDates } from '../../utils/date';

const LinRecForm = ({
  recId,
  onSubmit,
  onDelete,
  isDeleting,
  isSubmitting,
  initialValues,
}) => {
  const [open, setOpen] = React.useState(false);
  const [currentSlot, setCurrentSlot] = React.useState(undefined);

  const mergedInitialValues = React.useMemo(
    () => ({
      ...DEFAULT_VALUES,
      ...initialValues,
      recommendation: {
        ...DEFAULT_VALUES.recommendation,
        ...initialValues.recommendation,
      },
    }),
    [initialValues],
  );

  const handleOpen = (slotName) => {
    setCurrentSlot(slotName);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const clearSlots = (resetForm, values) =>
    resetForm({
      values: {
        ...DEFAULT_VALUES,
        startDateTime: values.startDateTime,
        endDateTime: values.endDateTime,
        cluster: values.cluster,
      },
    });

  const assignEventToSlot = (setFieldValue) => (value) => {
    setFieldValue(currentSlot, {
      ...value,
      position: currentSlot.split('.')[1],
    });
  };

  const createRow = (slotType, startDateTime) => {
    const rows = [];
    for (let i = 1; i <= 5; i++) {
      rows.push(
        <EventSlot
          key={i}
          handleOpen={handleOpen}
          name={`recommendation.${i}.${slotType}`}
          hd={slotType === slotTypes.HD}
          disabled={recId && isExpired(startDateTime)}
        />,
      );
    }
    return rows;
  };

  return (
    <LinRecFormWrapper>
      <Formik
        initialValues={mergedInitialValues}
        validationSchema={recId ? isEditingValidationSchema : validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ setFieldValue, values, resetForm }) => (
          <Form data-testid="form-upsert-rec-lin">
            <Grid container spacing={1.5}>
              {/* The LIN is still editable (not in the past) or we are creating new one */}
              {((recId && !isExpired(values.startDateTime)) || !recId) && (
                <>
                  <Grid item xs={4}>
                    <Select
                      name="cluster"
                      label="Cluster"
                      size="medium"
                      options={clusters}
                      data-test="select-cluster"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <DateTimePicker
                      name="startDateTime"
                      label="Start Date"
                      disablePast
                    />
                  </Grid>
                </>
              )}

              {((recId &&
                nowIsBetweenTwoDates(
                  values.startDateTime,
                  values.endDateTime,
                )) ||
                (recId && !isExpired(values.endDateTime)) ||
                !recId) && (
                <Grid item xs={4}>
                  <DateTimePicker
                    name="endDateTime"
                    label="End Date"
                    disablePast
                  />
                </Grid>
              )}

              <Grid item xs={12} data-testid="sd-slot-row">
                <Marginer direction="horizontal" margin={10} />
                <SlotsRowWrapper>
                  {createRow(slotTypes.SD, values.startDateTime)}
                </SlotsRowWrapper>
              </Grid>

              <Grid item xs={12} data-testid="hd-slot-row">
                <SlotsRowWrapper>
                  {createRow(slotTypes.HD, values.startDateTime)}
                </SlotsRowWrapper>
              </Grid>

              <Grid item xs={12}>
                <ButtonsWrapper>
                  {((recId && !isExpired(values.startDateTime)) || !recId) && (
                    <LeftButtons>
                      <ClearBtn onClick={() => clearSlots(resetForm, values)}>
                        Clear
                      </ClearBtn>
                      <Marginer direction="vertical" margin={10} />
                      {recId && (
                        <LoadingButton
                          variant="contained"
                          color="error"
                          loading={isDeleting}
                          onClick={() => onDelete(recId)}
                        >
                          Delete
                        </LoadingButton>
                      )}
                    </LeftButtons>
                  )}

                  {((recId &&
                    nowIsBetweenTwoDates(
                      values.startDateTime,
                      values.endDateTime,
                    )) ||
                    (recId && !isExpired(values.endDateTime)) ||
                    !recId) && (
                    <LoadingButton
                      type="submit"
                      variant="contained"
                      color="success"
                      loading={isSubmitting}
                    >
                      {recId ? 'Update' : 'Create'}
                    </LoadingButton>
                  )}
                </ButtonsWrapper>
              </Grid>
            </Grid>
            <Modal
              title={`SEARCH LIN [${currentSlot?.split('.')[2].toUpperCase()}]`}
              open={open}
              handleClose={handleClose}
              data_test="search-lin-modal"
            >
              <SearchLinRec
                addEvent={assignEventToSlot(setFieldValue)}
                resolution={currentSlot?.split('.')[2].toUpperCase()}
                handleClose={handleClose}
              />
            </Modal>
          </Form>
        )}
      </Formik>
    </LinRecFormWrapper>
  );
};

LinRecForm.propTypes = {
  recId: PropTypes.string,
  initialValues: PropTypes.object.isRequired,
  isDeleting: PropTypes.bool.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default LinRecForm;
