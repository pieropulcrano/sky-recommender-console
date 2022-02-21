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
import { isEditingPresentRecSchema, validationSchema } from './validation';
import { isExpired, nowIsBetweenTwoDates } from '../../utils/date';
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

/**
 * Component to create / edit a linear recommendation.
 */

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
  const [isEditingFutureRec, setIsEditingFutureRec] = React.useState(false);
  const [isEditingPresentRec, setIsEditingPresentRec] = React.useState(false);

  React.useEffect(() => {
    if (recId) {
      const { startDateTime, endDateTime } = initialValues;
      if (!isExpired(startDateTime)) setIsEditingFutureRec(true);
      else if (nowIsBetweenTwoDates(startDateTime, endDateTime))
        setIsEditingPresentRec(true);
    }
  }, [recId, initialValues]);

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

  const createRow = (slotType) => {
    const rows = [];
    for (let i = 1; i <= 5; i++) {
      rows.push(
        <EventSlot
          key={i}
          handleOpen={handleOpen}
          name={`recommendation.${i}.${slotType}`}
          type={slotType}
          disabled={recId && !isEditingFutureRec}
        />,
      );
    }
    return rows;
  };

  const handleSubmit = (values) => onSubmit(values);

  return (
    <LinRecFormWrapper>
      <Formik
        initialValues={mergedInitialValues}
        validationSchema={
          recId && isEditingPresentRec
            ? isEditingPresentRecSchema
            : validationSchema
        }
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ setFieldValue, values, resetForm }) => (
          <Form data-testid="form-upsert-rec-lin">
            <Grid container spacing={1.5}>
              {/*Render only if we are creating a new recommendation or we are editing a recommendation scheduled for the future */}
              {(!recId || isEditingFutureRec) && (
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
              {/*Render only if we are creating a new recommendation or we are editing a recommendation scheduled for the present/future */}
              {(!recId || isEditingPresentRec || isEditingFutureRec) && (
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
                  {(!recId || isEditingFutureRec) && (
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

                  {(!recId || isEditingPresentRec || isEditingFutureRec) && (
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
  /**
   * The id of the lineare recommendation to retrieve.
   */
  recId: PropTypes.string,
  /**
   * The initial values passed the form state.
   */
  initialValues: PropTypes.object.isRequired,
  /**
   * The form is performing a delete operation.
   */
  isDeleting: PropTypes.bool.isRequired,
  /**
   * The form is performing a submit operation
   */
  isSubmitting: PropTypes.bool.isRequired,
  /**
   * Callback function called when the user clicks on the submit button.
   */
  onSubmit: PropTypes.func.isRequired,
  /**
   * Callback function called when the user clicks on the delete button.
   */
  onDelete: PropTypes.func.isRequired,
};

export default LinRecForm;
