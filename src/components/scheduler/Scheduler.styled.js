import { styled } from '@mui/material';
import Box from '@mui/material/Box';

/**
 * Workaround necessary to toggle the visibility of the scheduler.
 * @see https://github.com/fullcalendar/fullcalendar-react/issues/97
 */
export const Hidden = styled((props) => <Box {...props} />)(
  ({ isLoading }) => ({
    visibility: isLoading ? 'hidden' : 'visible',
  }),
);
