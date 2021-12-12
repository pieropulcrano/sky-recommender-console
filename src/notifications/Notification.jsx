import React from 'react';
import { styled } from '@mui/system';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import useNotification from '../hooks/useNotification';

const NotificationWrapper = styled('div')({
  position: 'fixed',
  right: '4px',
  bottom: '4px',
  zIndex: '2000',
});

const AlertWrapper = styled('div')({
  marginBottom: '4px',
  width: '400px',
});

function SnackbarProvider({ duration = 6000, alert, handleClose }) {
  React.useEffect(() => {
    const timer = setTimeout(() => handleClose(alert), duration);
    return () => {
      clearTimeout(timer);
    };
  }, [alert, duration, handleClose]);

  return (
    <AlertWrapper>
      <Alert
        onClose={() => handleClose(alert)}
        id={alert.id}
        elevation={6}
        variant="filled"
        severity={alert.type}
      >
        <AlertTitle>{alert.title}</AlertTitle>
        {alert.text}
      </Alert>
    </AlertWrapper>
  );
}

export default function Notification(props) {
  const { state, removeAlert } = useNotification();

  const handleClose = (alert) => {
    removeAlert(alert);
  };

  return (
    <NotificationWrapper>
      {state?.alerts.length > 0 &&
        state.alerts.map((alert, index) => (
          <SnackbarProvider
            key={alert.id + index}
            alert={alert}
            handleClose={handleClose}
            {...props}
          />
        ))}
    </NotificationWrapper>
  );
}
