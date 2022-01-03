import { styled } from '@mui/material';
import Box from '@mui/material/Box';

// Toggle visibility
export const Hidden = styled((props) => <Box {...props} />)(
  ({ isLoading }) => ({
    visibility: isLoading ? 'hidden' : 'visible',
  }),
);
