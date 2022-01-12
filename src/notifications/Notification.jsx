import React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import useNotification from '../hooks/useNotification';
import { AlertWrapper, NotificationWrapper } from './Notification.styled';

function SnackbarProvider({ duration = 6000, alert, handleClose }) {
  React.useEffect(() => {
    const timer = setTimeout(() => handleClose(alert), duration);
    return () => {
      clearTimeout(timer);
    };
  }, [alert, duration, handleClose]);

  return (
    <AlertWrapper data-test={alert.data_test}>
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
