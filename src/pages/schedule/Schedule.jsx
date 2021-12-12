import React from 'react';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '../../components/modal/Modal';
import UpsertVodRec from '../../containers/upsert-vod-rec/UpsertVodRec';

const Schedule = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Container maxWidth="xl">
      <Box sx={{ m: 2 }} />
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button onClick={handleOpen} variant="contained">
          NEW VOD
        </Button>
      </div>
      <Modal
        title="NEW VOD"
        open={open}
        handleClose={handleClose}
        handleOpen={handleOpen}
      >
        <UpsertVodRec />
      </Modal>
    </Container>
  );
};

export default Schedule;
