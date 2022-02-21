import { styled } from '@mui/system';
import PropTypes from 'prop-types';

/**
 * Component to add additional space between components.
 */

const Marginer = styled('span')(({ direction, margin }) => ({
  display: 'flex',
  width: direction === 'vertical' && `${margin}px`,
  height: direction === 'horizontal' && `${margin}px`,
}));

Marginer.propTypes = {
  /**
   * The direction of the Marginer
   */
  direction: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
  /**
   * The margin (in px).
   */
  margin: PropTypes.number.isRequired,
};

export default Marginer;
