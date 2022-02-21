import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';

/**
 * Button to clear all the fields of the form.
 */

const ClearBtn = ({ children, onClick, ...props }) => {
  return (
    <Button onClick={onClick} {...props}>
      {children}
    </Button>
  );
};

ClearBtn.defaultProps = {
  size: 'medium',
  variant: 'contained',
};

ClearBtn.propTypes = {
  /**
   * The child component rendered by the button.
   */
  children: PropTypes.node.isRequired,
  /**
   *  Gets called when the user click on the button.
   */
  onClick: PropTypes.func.isRequired,
};

export default ClearBtn;
