import React from 'react';
import { AlertContext } from '../notifications/AlertProvider';

export default function useNotification() {
  const {
    actions: { addAlert, removeAlert },
    state,
  } = React.useContext(AlertContext);

  return { state, addAlert, removeAlert };
}
