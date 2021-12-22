import React from 'react';
import { useFormikContext } from 'formik';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

const Clear = ({ children, initialValues, ...props }) => {
  const { resetForm } = useFormikContext();

  const handleClear = () => resetForm({ values: initialValues });

  const configButton = {
    variant: 'contained',
    onClick: handleClear,
    size: 'medium',
  };

  return (
    <Button {...configButton} {...props}>
      <DeleteIcon /> Clear
    </Button>
  );
};

export default Clear;
