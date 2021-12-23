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

const App = () => {
  return (
    <Router>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <AlertContextProvider>
          <Switch>
            <Redirect exact from="/" to="/schedule" />
            <Route exact path="/:page?" component={Home} />
          </Switch>
          <Notification />
        </AlertContextProvider>
      </LocalizationProvider>
    </Router>
  );
};

export default App;
