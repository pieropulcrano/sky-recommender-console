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
import { DEFAULT_VALUES, validationSchema } from './validation';
import { clusters } from './config';
import { isExpired } from '../../utils/date';
import VodRecSearchForm from '../vod-rec-search-form/VodRecSearchForm';

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

  const mergedInitialValues = React.useMemo(
    () => ({
      ...DEFAULT_VALUES,
      ...initialValues,
    }),
    [initialValues],
  );

  const handleOpen = (slotName) => {
    setCurrentSlot(slotName);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const assignEventToSlot = (setFieldValue) => (value) => {
    setFieldValue(currentSlot, {
      ...value,
      position: currentSlot.split('.')[1],
    });
  };

  const createRow = (startIndex, endIndex, values, recId) => {
    const rows = [];
    for (let i = startIndex; i <= endIndex; i++) {
      rows.push(
        <EventSlot
          key={i}
          name={`recommendation.${i}`}
          handleOpen={handleOpen}
          disabled={recId && isExpired(values.startDateTime)}
        />,
      );
    }
    return rows;
  };

  return (
    <VocRecFormWrapper>
      <Formik
        onSubmit={onSubmit}
        initialValues={mergedInitialValues}
        validationSchema={validationSchema}
        enableReinitialize
      >
        {({ setFieldValue, values }) => (
          <Form>
            <Grid container spacing={1.5}>
              {/* The VOD is still editable (not in the past) or we are creating new one */}
              {((recId && !isExpired(values.startDateTime)) || !recId) && (
                <>
                  <Grid item xs={4}>
                    <Select
                      name="cluster"
                      label="Cluster"
                      size="medium"
                      options={clusters}
                    />
                  </Grid>

                  <Grid item xs={4}>
                    <DateTimePicker name="startDateTime" label="Start Date" />
                  </Grid>

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
                </>
              )}

              <Grid item xs={12}>
                <Marginer direction="horizontal" margin={10} />
                <SlotsRowWrapper>
                  {createRow(1, 5, values, recId, values, recId)}
                </SlotsRowWrapper>
                <Marginer direction="horizontal" margin={10} />
              </Grid>

              {/* The VOD is still editable (not in the past) or we are creating new one */}
              {((recId && !isExpired(values.startDateTime)) || !recId) && (
                <Grid item xs={12}>
                  <ButtonsWrapper>
                    <LeftButtons>
                      <ClearBtn
                        initialValues={{
                          ...DEFAULT_VALUES,
                          startDateTime: values.startDateTime,
                          cluster: values.cluster,
                        }}
                      >
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
                      loading={isSubmitting}
                    >
                      {recId ? 'Update' : 'Create'}
                    </LoadingButton>
                  </ButtonsWrapper>
                </Grid>
              )}
            </Grid>

            <Modal title="SEARCH VOD" open={open} handleClose={handleClose}>
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

VodRecSearchForm.defaultProps = {
  id: undefined,
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
