import React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {
  LeftButtons,
  ButtonsWrapper,
} from '../components/common/Common.styled';

const ConfirmDialog = ({ title, children, open, setOpen, onConfirm }) => {
  return (
    <Dialog
      open={open}
      onClose={(_, reason) => {
        if (reason !== 'backdropClick') {
          setOpen(false);
        }
      }}
      aria-labelledby="confirm-dialog"
      disableEnforceFocus
    >
      <DialogTitle sx id="confirm-dialog">
        {title}
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Grid item xs={12}>
          <ButtonsWrapper>
            <LeftButtons>
              <Button
                variant="contained"
                color="error"
                onClick={() => setOpen(false)}
              >
                No
              </Button>
            </LeftButtons>
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                setOpen(false);
                onConfirm();
              }}
            >
              Yes
            </Button>
          </ButtonsWrapper>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};
export default ConfirmDialog;
