import React from 'react';
import { Formik, Form } from 'formik';
import { styled } from '@mui/material';
import { DEFAULT_VALUES, validationSchema } from './validation';
import { clusters } from './config';
import Grid from '@mui/material/Grid';
import LoadingButton from '@mui/lab/LoadingButton';
import SearchVodRec from '../../containers/search-vod-rec/SearchVodRec';
import EventSlot from '../form/event-slot/EventSlot';
import DateTimePicker from '../form/date-time-picker/DateTimePicker';
import Select from '../form/select/Select';
import Clear from '../form/clear/Clear';
import Modal from '../modal/Modal';

const VocRecFormWrapper = styled('div')({
  maxWidth: '100%',
  width: '700px',
  height: '100%',
  maxHeight: '600px',
  paddingTop: '10px',
});

const SlotsRowWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
});

const ButtonsWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
});

const VocRecForm = ({ onSubmit, initialValues, isSubmitting }) => {
  const [open, setOpen] = React.useState(false);
  const [currentSlot, setCurrentSlot] = React.useState(undefined);

  const handleOpen = (slotName) => {
    setCurrentSlot(slotName);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const mergedInitialValues = React.useMemo(
    () => ({
      ...DEFAULT_VALUES,
      ...initialValues,
    }),
    [initialValues],
  );

  return (
    <VocRecFormWrapper>
      <Formik
        onSubmit={onSubmit}
        initialValues={mergedInitialValues}
        validationSchema={validationSchema}
      >
        {({ setFieldValue }) => (
          <Form>
            <Grid container spacing={1.5}>
              <Grid item xs={6}>
                <Select
                  name="cluster"
                  label="Cluster"
                  size="medium"
                  options={clusters}
                />
              </Grid>

              <Grid item xs={6}>
                <DateTimePicker name="startDateTime" label="Start Date" />
              </Grid>

              <Grid item xs={12}>
                <SlotsRowWrapper>
                  <EventSlot name="recommendation.1" handleOpen={handleOpen} />
                  <EventSlot name="recommendation.2" handleOpen={handleOpen} />
                  <EventSlot name="recommendation.3" handleOpen={handleOpen} />
                  <EventSlot name="recommendation.4" handleOpen={handleOpen} />
                  <EventSlot name="recommendation.5" handleOpen={handleOpen} />
                </SlotsRowWrapper>
              </Grid>

              <Grid item xs={12}>
                <ButtonsWrapper>
                  <Clear initialValues={DEFAULT_VALUES} />
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    color="success"
                    loading={isSubmitting}
                  >
                    Create
                  </LoadingButton>
                </ButtonsWrapper>
              </Grid>
            </Grid>

            <Modal title="SEARCH VOD" open={open} handleClose={handleClose}>
              <SearchVodRec
                addEvent={(value) => {
                  setFieldValue(currentSlot, {
                    ...value,
                    position: currentSlot.split('.')[1],
                  });
                }}
                handleClose={handleClose}
              />
            </Modal>
          </Form>
        )}
      </Formik>
    </VocRecFormWrapper>
  );
};

export default VocRecForm;
