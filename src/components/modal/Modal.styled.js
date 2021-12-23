import { styled } from '@mui/material';

export const ModalBody = styled('div')({
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

export const ModalHeader = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});
