import styled from '@emotion/styled';
import Paper from '@mui/material/Paper';
import LoadingButton from '@mui/lab/LoadingButton';

export const LoadingButtonBlock = styled((props) => (
  <LoadingButton {...props} />
))`
  width: 100%;
`;

export const LoginBackgroud = styled((props) => <Paper {...props} />)`
  justify-content: center;
  min-height: 30vh;
  padding: 50px;
`;
