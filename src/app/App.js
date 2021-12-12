import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { AlertContextProvider } from '../notifications/AlertProvider';
import Notification from '../notifications/Notification';
import Home from '../pages/home/Home';

const App = () => {
  return (
    <Router>
      <CssBaseline />
      <AlertContextProvider>
        <Switch>
          <Redirect exact from="/" to="/schedule" />
          <Route exact path="/:page?" component={Home} />
        </Switch>
        <Notification />
      </AlertContextProvider>
    </Router>
  );
};

export default App;
