import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import Grid from '@mui/material/Grid';
import LoadingButton from '@mui/lab/LoadingButton';
import EventSlot from '../form/event-slot/EventSlot';
import SearchVodRec from '../../containers/search-vod-rec/SearchVodRec';
import Modal from '../modal/Modal';
import { VocRecFallbackFormWrapper } from './VodRecFallbackForm.styled';
import { SlotsRowWrapper, RigthButtonWrapper } from '../common/Common.styled';
import { validationSchema } from './validation';
import { DEFAULT_VALUES } from './config';

/**
 * Form to add / edit the fallback vod recommendation
 */

const VocRecFallbackForm = ({ onSubmit, initialValues, isSubmitting }) => {
  const [open, setOpen] = React.useState(false);
  const [currentSlot, setCurrentSlot] = React.useState(null);

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

  const assignEventToSlot = (setFieldValue) => (value) => {
    setFieldValue(currentSlot, {
      ...value,
      position: currentSlot.split('.')[1],
    });
  };

  const createRow = (startIndex, endIndex, values) => {
    const rows = [];
    for (let i = startIndex; i <= endIndex; i++) {
      rows.push(
        <EventSlot
          data_test_slot="fallback-slot"
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
        {({ setFieldValue, values }) => (
          <Form>
            <Grid container spacing={1.5}>
              <Grid item xs={12}>
                <SlotsRowWrapper>{createRow(1, 5, values)}</SlotsRowWrapper>
              </Grid>

              <Grid item xs={12}>
                <SlotsRowWrapper>{createRow(6, 10, values)}</SlotsRowWrapper>
              </Grid>

              <Grid item xs={12}>
                <RigthButtonWrapper>
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    color="success"
                    loading={isSubmitting}
                  >
                    Update
                  </LoadingButton>
                </RigthButtonWrapper>
              </Grid>
            </Grid>

            <Modal
              title="Search VOD Event"
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
  /**
   * Called when the user click on the add / update button
   */
  onSubmit: PropTypes.func.isRequired,
  /**
   * Initial values provided to the form state
   */
  initialValues: PropTypes.object.isRequired,
  /**
   * The form is performing a submit operation
   */
  isSubmitting: PropTypes.bool.isRequired,
};

export default VocRecFallbackForm;
