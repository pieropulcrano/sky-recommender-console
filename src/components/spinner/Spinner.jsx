import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

/**
 * Spinner component.
 */

const Spinner = ({ height, width }) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '16px',
      height,
      width,
      maxWidth: '100%',
      maxHeight: '100%',
    }}
  >
    <CircularProgress size="32px" />
  </Box>
);

Spinner.defaultProps = {
  height: null,
  width: null,
};

Spinner.propTypes = {
  /**
   * Height relative to the spinner container.
   */
  height: PropTypes.string,
  /**
   * Width relative to the spinner container.
   */
  width: PropTypes.string,
};

export default Spinner;
