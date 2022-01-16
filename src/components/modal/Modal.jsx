import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import ModalComp from '@mui/material/Modal';
import { ModalHeader, ModalBody } from './Modal.styled';

const Modal = ({ title, open, handleClose, children, data_test }) => {
  return (
    <ModalComp
      open={open}
      onClose={handleClose}
      style={{ overflowY: 'auto' }}
      data-test={data_test}
    >
      <ModalBody>
        <ModalHeader>
          <Typography variant="h6" component="h6">
            {title}
          </Typography>
          <IconButton data-test="close-modal-btn" onClick={handleClose}>
            <ClearIcon color="error" fontSize="medium" />
          </IconButton>
        </ModalHeader>
        <hr />
        {children}
      </ModalBody>
    </ModalComp>
  );
};

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
