import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import Grid from '@mui/material/Grid';
import LoadingButton from '@mui/lab/LoadingButton';
import EventSlot from '../form/event-slot/EventSlot';
import SearchVodRec from '../../containers/search-vod-rec/SearchVodRec';
import ClearBtn from '../form/clear-btn/ClearBtn';
import Modal from '../modal/Modal';
import {
  VocRecFallbackFormWrapper,
  SlotsRowWrapper,
  ButtonsWrapper,
} from './VodRecFallbackForm.styled';
import { validationSchema } from './validation';
import { DEFAULT_VALUES } from './config';

const VocRecFallbackForm = ({ onSubmit, initialValues, isSubmitting }) => {
  const [open, setOpen] = React.useState(false);
  const [currentSlot, setCurrentSlot] = React.useState(null);

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

  const clearSlots = (resetForm) =>
    resetForm({
      values: {
        ...DEFAULT_VALUES,
      },
    });

  const createRow = (startIndex, endIndex) => {
    const rows = [];
    for (let i = startIndex; i <= endIndex; i++) {
      rows.push(
        <EventSlot
          customClass="fallback-slot"
          key={i}
          name={`recommendation.${i}`}
          handleOpen={handleOpen}
        />,
      );
    }
    return rows;
  };

  return (
    <VocRecFallbackFormWrapper>
      <Formik
        onSubmit={onSubmit}
        initialValues={mergedInitialValues}
        validationSchema={validationSchema}
        enableReinitialize
      >
        {({ setFieldValue, resetForm }) => (
          <Form>
            <Grid container spacing={1.5}>
              <Grid item xs={12}>
                <SlotsRowWrapper>{createRow(1, 5)}</SlotsRowWrapper>
              </Grid>

              <Grid item xs={12}>
                <SlotsRowWrapper>{createRow(6, 10)}</SlotsRowWrapper>
              </Grid>

              <Grid item xs={12}>
                <ButtonsWrapper>
                  <ClearBtn onClick={() => clearSlots(resetForm)}>
                    Clear
                  </ClearBtn>
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    color="success"
                    loading={isSubmitting}
                  >
                    Update
                  </LoadingButton>
                </ButtonsWrapper>
              </Grid>
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
    </VocRecFallbackFormWrapper>
  );
};

VocRecFallbackForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
};

export default VocRecFallbackForm;
