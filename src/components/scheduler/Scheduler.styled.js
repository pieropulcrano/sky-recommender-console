import styled from '@emotion/styled';
import Box from '@mui/material/Box';

/**
 * Workaround necessary to toggle the visibility of the scheduler.
 * @see https://github.com/fullcalendar/fullcalendar-react/issues/97
 */

export const Hidden = styled((props) => <Box {...props} />)`
  visibility: ${({ isLoading }) => (isLoading ? 'hidden' : 'visible')};
`;

export const StyleWrapper = styled.div`
  .fc .fc-button-primary {
    color: #fff;
    background-color: #1976d2;
    border-color: #1976d2;
  }

  .fc .fc-button-primary:visited,
  .fc .fc-button-primary:hover,
  .fc .fc-button-primary:focus,
  .fc .fc-button-primary:active,
  .fc .fc-button-primary:not(:disabled):active,
  .fc .fc-button-primary:not(:disabled).fc-button-active,
  button.fc-today-button.fc-button.fc-button-primary {
    background-color: #0d4dfd;
    border-color: #0d4dfd;
  }

  .fc-header-left,
  fc-header-center,
  fc-header-right {
    width: 100%;
    display: block;
  }

  @media (max-width: 870px) {
    .fc .fc-toolbar.fc-header-toolbar {
      display: flex;
      flex-direction: column;
    }

    .fc-header-toolbar .fc-toolbar-chunk {
      display: block;
    }
  }
`;
