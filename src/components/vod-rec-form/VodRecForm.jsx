import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import Grid from '@mui/material/Grid';
import Marginer from '../marginer/Marginer';
import LoadingButton from '@mui/lab/LoadingButton';
import SearchVodRec from '../../containers/search-vod-rec/SearchVodRec';
import EventSlot from '../form/event-slot/EventSlot';
import DateTimePicker from '../form/date-time-picker/DateTimePicker';
import Select from '../form/select/Select';
import ClearBtn from '../form/clear-btn/ClearBtn';
import Modal from '../modal/Modal';
import {
  VocRecFormWrapper,
  SlotsRowWrapper,
  ButtonsWrapper,
  LeftButtons,
} from './VodRecForm.styled';
import { validationSchema } from './validation';
import { clusters, DEFAULT_VALUES } from './config';
import { isExpired } from '../../utils/date';

const VocRecForm = ({
  recId,
  onSubmit,
  onDelete,
  isDeleting,
  initialValues,
  isSubmitting,
  prevVodRecIsLoading,
  loadPrevVodRec,
}) => {
  const [open, setOpen] = React.useState(false);
  const [currentSlot, setCurrentSlot] = React.useState(undefined);
  const [isEditingFutureRec, setIsEditingFutureRec] = React.useState(false);

  React.useEffect(() => {
    if (recId) {
      const { startDateTime } = initialValues;
      if (!isExpired(startDateTime)) setIsEditingFutureRec(true);
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
        cluster: values.cluster,
      },
    });

  const assignEventToSlot = (setFieldValue) => (value) => {
    setFieldValue(currentSlot, {
      ...value,
      position: currentSlot.split('.')[1],
    });
  };

  const handleSubmit = (values) => onSubmit(values);

  const createRow = (startIndex, endIndex, values, recId) => {
    const rows = [];
    for (let i = startIndex; i <= endIndex; i++) {
      rows.push(
        <EventSlot
          data_test_slot="prev-vod-slot"
          key={i}
          name={`recommendation.${i}`}
          handleOpen={handleOpen}
          disabled={recId && !isEditingFutureRec}
        />,
      );
    }
    return rows;
  };

  return (
    <VocRecFormWrapper>
      <Formik
        onSubmit={handleSubmit}
        initialValues={mergedInitialValues}
        validationSchema={validationSchema}
        enableReinitialize
      >
        {({ setFieldValue, values, resetForm }) => (
          <Form data-test="form-upsert-rec-vod">
            <Grid container spacing={1.5}>
              {/* The VOD is still editable (not in the past) or we are creating new one */}
              {(isEditingFutureRec || !recId) && (
                <>
                  <Grid item xs={4}>
                    <Select
                      data-test="select-cluster"
                      name="cluster"
                      label="Cluster"
                      size="medium"
                      options={clusters}
                    />
                  </Grid>

                  <Grid item xs={4}>
                    <DateTimePicker
                      data_test="select-date"
                      name="startDateTime"
                      label="Start Date"
                      disablePast
                    />
                  </Grid>

                  {!recId && (
                    <Grid item xs={4} justifyContent="flex-end">
                      <LoadingButton
                        variant="contained"
                        color="primary"
                        loading={prevVodRecIsLoading}
                        onClick={() => loadPrevVodRec(values)}
                      >
                        Load
                      </LoadingButton>
                    </Grid>
                  )}
                </>
              )}

              <Grid item xs={12}>
                <Marginer direction="horizontal" margin={10} />
                <SlotsRowWrapper>
                  {createRow(1, 5, values, recId)}
                </SlotsRowWrapper>
                <Marginer direction="horizontal" margin={10} />
              </Grid>

              {/* The VOD is still editable (not in the past) or we are creating new one */}
              {(isEditingFutureRec || !recId) && (
                <Grid item xs={12}>
                  <ButtonsWrapper>
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
                    <LoadingButton
                      type="submit"
                      variant="contained"
                      color="success"
                      data-test="submit-upsert-btn"
                      loading={isSubmitting}
                    >
                      {recId ? 'Update' : 'Create'}
                    </LoadingButton>
                  </ButtonsWrapper>
                </Grid>
              )}
            </Grid>

            <Modal
              title="SEARCH VOD"
              data_test="search-vod-modal"
              open={open}
              handleClose={handleClose}
            >
              <SearchVodRec
                addEvent={assignEventToSlot(setFieldValue)}
                handleClose={handleClose}
              />
            </Modal>
          </Form>
        )}
      </Formik>
    </VocRecFormWrapper>
  );
};

VocRecForm.propTypes = {
  recId: PropTypes.string,
  loadPrevVodRec: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  isDeleting: PropTypes.bool.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  prevVodRecIsLoading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default VocRecForm;
