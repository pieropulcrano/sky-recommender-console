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
import {
  isExpired,
  nowIsBetweenTwoDates,
  formatToISO8601,
} from '../../utils/date';
import {
  SlotsRowWrapper,
  RecFormWrapper,
  LeftButtons,
  ButtonsWrapper,
} from '../common/Common.styled';
import Marginer from '../marginer/Marginer';
import DateTimePicker from '../form/date-time-picker/DateTimePicker';
import { clusters, DEFAULT_VALUES } from './config';
import { slotTypes } from '../form/event-slot/EventSlot.types';
import ConfirmDialog from '../../confirmation-dialog/ConfirmDialog';

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
  modalTitle,
  openModal,
  handleOpenModalConfirm,
  handleCloseModal,
  confirmOpen,
  setConfirmOpen,
  removeToken,
}) => {
  const [open, setOpen] = React.useState(false);
  const [currentSlot, setCurrentSlot] = React.useState(undefined);
  const [isEditingFutureRec, setIsEditingFutureRec] = React.useState(false);
  const [isEditingPresentRec, setIsEditingPresentRec] = React.useState(false);

  const formRef = React.useRef();

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

  const handleCheckOpenModalConfirm = () => {
    if (formRef.current.dirty) {
      handleOpenModalConfirm();
    } else {
      handleCloseModal();
    }
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

  const createRow = (slotType, values) => {
    const rows = [];
    for (let i = 1; i <= 5; i++) {
      rows.push(
        <EventSlot
          key={i}
          handleOpen={handleOpen}
          name={`recommendation.${i}.${slotType}`}
          type={slotType}
          disabled={recId && !isEditingFutureRec}
          disableAddIcon={values.startDateTime === null}
        />,
      );
    }
    return rows;
  };

  const handleSubmit = (values) => onSubmit(values);

  return (
    <>
      <ConfirmDialog
        title="Discard changes?"
        open={confirmOpen}
        setOpen={setConfirmOpen}
        onConfirm={handleCloseModal}
      >
        Are you sure you want to leave without saving?
      </ConfirmDialog>
      <Modal
        title={modalTitle}
        open={openModal}
        handleClose={handleCheckOpenModalConfirm}
        data_test="scheduler-modal"
      >
        <RecFormWrapper>
          <Formik
            initialValues={mergedInitialValues}
            validationSchema={
              recId && isEditingPresentRec
                ? isEditingPresentRecSchema
                : validationSchema
            }
            innerRef={formRef}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ setFieldValue, values, resetForm }) => (
              <Form data-testid="form-upsert-rec-lin">
                <Grid container spacing={1.5}>
                  {/*Able only if we are creating a new recommendation or we are editing a recommendation scheduled for the future */}
                  <Grid item xs={4}>
                    <Select
                      name="cluster"
                      label="Cluster"
                      size="medium"
                      options={clusters}
                      data-test="select-cluster"
                      disabled={!recId || isEditingFutureRec ? false : true}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <DateTimePicker
                      name="startDateTime"
                      label="Start Date"
                      disablePast={!recId || isEditingFutureRec ? true : false}
                      disabled={!recId || isEditingFutureRec ? false : true}
                    />
                  </Grid>
                  {/*Able only if we are creating a new recommendation or we are editing a recommendation scheduled for the present/future */}
                  <Grid item xs={4}>
                    <DateTimePicker
                      name="endDateTime"
                      label="End Date"
                      disablePast={
                        isEditingPresentRec || isEditingFutureRec || !recId
                          ? true
                          : false
                      }
                      disabled={
                        isEditingPresentRec || isEditingFutureRec || !recId
                          ? false
                          : true
                      }
                    />
                  </Grid>
                  <Grid item xs={12} data-testid="sd-slot-row">
                    <Marginer direction="horizontal" margin={10} />
                    <SlotsRowWrapper>
                      {createRow(slotTypes.SD, values)}
                    </SlotsRowWrapper>
                  </Grid>
                  <Grid item xs={12} data-testid="hd-slot-row">
                    <SlotsRowWrapper>
                      {createRow(slotTypes.HD, values)}
                    </SlotsRowWrapper>
                  </Grid>
                  <Grid item xs={12}>
                    <ButtonsWrapper>
                      <LeftButtons>
                        <ClearBtn
                          disabled={!recId || isEditingFutureRec ? false : true}
                          onClick={() => clearSlots(resetForm, values)}
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
                            disabled={
                              !isEditingPresentRec &&
                              isEditingFutureRec &&
                              recId
                                ? false
                                : true
                            }
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
                        disabled={
                          !isEditingPresentRec && !isEditingFutureRec && recId
                            ? true
                            : false
                        }
                      >
                        {recId ? 'Update' : 'Create'}
                      </LoadingButton>
                    </ButtonsWrapper>
                  </Grid>
                </Grid>
                <Modal
                  title={`Search Linear Event [${currentSlot
                    ?.split('.')[2]
                    .toUpperCase()}]`}
                  open={open}
                  handleClose={handleClose}
                  data_test="search-lin-modal"
                >
                  <SearchLinRec
                    addEvent={assignEventToSlot(setFieldValue)}
                    resolution={currentSlot?.split('.')[2].toUpperCase()}
                    handleClose={handleClose}
                    removeToken={removeToken}
                    initialStartDateTime={
                      values.startDateTime &&
                      !isNaN(Date.parse(formatToISO8601(values.startDateTime)))
                        ? formatToISO8601(values.startDateTime)
                        : null
                    }
                  />
                </Modal>
              </Form>
            )}
          </Formik>
        </RecFormWrapper>
      </Modal>
    </>
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
  /**
   * The Title of the modal.
   */
  modalTitle: PropTypes.string.isRequired,
  /**
   * The callback function called for open the modal
   */
  openModal: PropTypes.bool,
  /**
   * The callback function called for open the modal of confirmation
   */
  handleOpenModalConfirm: PropTypes.func.isRequired,
  /**
   * The callback function called for Close the modal
   */
  handleCloseModal: PropTypes.func.isRequired,
  /**
   * Bool for open the confirmation popup
   */
  confirmOpen: PropTypes.bool.isRequired,
  /**
   * The callback function called for Open the confirmation modal
   */
  setConfirmOpen: PropTypes.func.isRequired,
  /**
   * Perform logout
   */
  removeToken: PropTypes.func.isRequired,
};

export default LinRecForm;
