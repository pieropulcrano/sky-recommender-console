import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { AlertContextProvider } from '../notifications/AlertProvider';
import Notification from '../notifications/Notification';
import Home from '../pages/home/Home';
import useToken from '../hooks/useToken';
import Login from '../pages/login/Login';

/**
 * The entry point component of the application.
 */
const App = () => {
  const { token, saveToken, removeToken } = useToken();

  return (
    <Router basename={`${process.env.REACT_APP_BASENAME}`}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <AlertContextProvider>
          {!token ? (
            <Login saveToken={saveToken} />
          ) : (
            <Switch>
              <Route exact from="/">
                <Home removeToken={removeToken} />
              </Route>
              <Redirect from="*" to="/" />
            </Switch>
          )}

          <Notification />
        </AlertContextProvider>
      </LocalizationProvider>
    </Router>
  );
};

export default App;
