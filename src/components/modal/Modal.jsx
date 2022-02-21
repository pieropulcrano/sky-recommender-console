import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import { ModalC, ModalHeader, ModalBody } from './Modal.styled';

/**
 * Modal component
 */

const Modal = ({ title, open, handleClose, children, data_test }) => {
  return (
    <ModalC open={open} onClose={handleClose} data-test={data_test}>
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
    </ModalC>
  );
};

Modal.propTypes = {
  /**
   * Text displayed in the modal header
   */
  title: PropTypes.string.isRequired,
  /**
   * Show / hide the modal
   */
  open: PropTypes.bool.isRequired,
  /**
   * Callback function to close the modal
   */
  handleClose: PropTypes.func.isRequired,
  /**
   * The content to display in the modal
   */
  children: PropTypes.node.isRequired,
};

export default Modal;
