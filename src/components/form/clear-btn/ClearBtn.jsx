import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';

const ClearBtn = ({ children, onClick, ...props }) => {
  const configButton = {
    variant: 'contained',
    onClick: onClick,
    size: 'medium',
  };

  return (
    <Button {...configButton} {...props}>
      {children}
    </Button>
  );
};

ClearBtn.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ClearBtn;
