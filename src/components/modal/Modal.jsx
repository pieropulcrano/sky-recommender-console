import React from 'react';
import { styled } from '@mui/material';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import ModalComp from '@mui/material/Modal';

const ModalBody = styled('div')({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  boxShadow: 24,
  backgroundColor: '#fff',
  padding: '10px 20px',
  borderRadius: '4px',
  maxWidth: '100%',
  maxHeight: '100%',
  overflow: 'auto',
  margin: '5px',
});

const ModalHeader = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const Modal = ({ title, open, handleClose, children }) => {
  return (
    <ModalComp open={open} onClose={handleClose} style={{ overflowY: 'auto' }}>
      <ModalBody>
        <ModalHeader>
          <Typography variant="h6" component="h6">
            {title}
          </Typography>
          <IconButton onClick={handleClose}>
            <ClearIcon color="error" fontSize="medium" />
          </IconButton>
        </ModalHeader>
        <hr />
        {children}
      </ModalBody>
    </ModalComp>
  );
};

export default Modal;
