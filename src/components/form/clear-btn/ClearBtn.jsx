import React from 'react';
import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';
import Button from '@mui/material/Button';

const ClearBtn = ({ children, initialValues, ...props }) => {
  const { resetForm } = useFormikContext();

  const handleClick = () => resetForm({ values: initialValues });

  const configButton = {
    variant: 'contained',
    onClick: handleClick,
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
  initialValues: PropTypes.object.isRequired,
};

export default ClearBtn;
