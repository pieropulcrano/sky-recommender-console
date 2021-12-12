import { styled } from '@mui/system';

const Marginer = styled('span')(({ direction, margin }) => ({
  display: 'flex',
  width: direction === 'vertical' ? `${margin}px` : null,
  height: direction === 'horizontal' ? `${margin}px` : null,
}));

export default Marginer;
