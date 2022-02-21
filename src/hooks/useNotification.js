import React from 'react';
import { AlertContext } from '../notifications/AlertProvider';

/**
 * Hook to add or remove a notification.
 * @returns {Object} - The current state, a function to add (or remove) an alert.
 */

export default function useNotification() {
  const {
    actions: { addAlert, removeAlert },
    state,
  } = React.useContext(AlertContext);

  return { state, addAlert, removeAlert };
}
