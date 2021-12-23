import { styled } from '@mui/system';
import PropTypes from 'prop-types';

const Marginer = styled('span')(({ direction, margin }) => ({
  display: 'flex',
  width: direction === 'vertical' && `${margin}px`,
  height: direction === 'horizontal' && `${margin}px`,
}));

Marginer.propTypes = {
  direction: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
  margin: PropTypes.number.isRequired,
};

export default Marginer;
