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
  const [tokenL, setToken] = React.useState(token);

  const handleRemoveToken = () => {
    setToken(undefined);
    removeToken();
  };

  const handeSetToken = (data) => {
    saveToken(data);
    setToken(data);
  };

  window.addEventListener('unload', (event) => {
    //on close tab
    handleRemoveToken();
  });

  React.useEffect(() => {
    //on refresh page
    if (performance.navigation.type === 1) {
      handleRemoveToken();
    } else {
      // console.log('This page is not reloaded');
    }
  }, []);
  return (
    <Router basename={`${process.env.REACT_APP_BASENAME}`}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <AlertContextProvider>
          <Switch>
            {!tokenL && <Login saveToken={handeSetToken} />}
            {tokenL && (
              <>
                <Route exact from="/">
                  <Home removeToken={handleRemoveToken} />
                </Route>
                <Redirect from="*" to="/" />
              </>
            )}
          </Switch>

          <Notification />
        </AlertContextProvider>
      </LocalizationProvider>
    </Router>
  );
};

export default App;
