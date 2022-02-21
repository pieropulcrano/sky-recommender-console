import styled from '@emotion/styled';
import Modal from '@mui/material/Modal';

export const ModalBody = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 24;
  background-color: #fff;
  padding: 10px 20px;
  border-radius: 4px;
  max-width: 100%;
  max-height: 100%;
  overflow: auto;
  margin: 5px;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ModalC = styled((props) => <Modal {...props} />)`
  overlflow-y: auto;
`;
