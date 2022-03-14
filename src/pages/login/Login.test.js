import React from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as AuthProvider from '../../providers/auth-provider/AuthProvider';
import Login from './Login';

let mockedAddAlert = jest.fn();

jest.mock('../../hooks/useNotification', () => () => ({
  addAlert: mockedAddAlert,
}));

describe('Login', () => {
  const saveToken = jest.fn();
  const loginBtn = 'Login';
  const usernameLabel = 'Username';
  const pwdLabel = 'Password';
  const user = 'test';
  const pwd = 'test';
  const alertError = {
    text: 'Password or Username are not valid',
    title: `Login Error`,
    type: 'error',
    id: expect.anything(),
  };

  const props = {
    saveToken,
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  beforeAll(() => {
    jest.restoreAllMocks();
  });

  it('should handle onSubmit error correctly', async () => {
    const mockedLogin = jest.fn(() => {
      throw new Error('error');
    });

    jest.spyOn(AuthProvider, 'loginUser').mockImplementation(mockedLogin);

    render(
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Login {...props} />
      </LocalizationProvider>,
    );
    const usernameInput = screen.queryByLabelText(usernameLabel);
    userEvent.type(usernameInput, user);

    const pwdInput = screen.queryByLabelText(pwdLabel);
    userEvent.type(pwdInput, pwd);

    const loginButton = screen.queryByText(loginBtn);
    await waitFor(() => {
      fireEvent.click(loginButton);
    });

    expect(mockedLogin).toHaveBeenCalledTimes(1);
    expect(mockedAddAlert).toHaveBeenCalledTimes(1);
    expect(mockedAddAlert).toHaveBeenCalledWith(alertError);
  });

  it('should handle onSubmit success correctly', async () => {
    const mockedLogin = jest.fn(() => {
      return { status: '0', message: '' };
    });

    jest.spyOn(AuthProvider, 'loginUser').mockImplementation(mockedLogin);

    render(
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Login {...props} />
      </LocalizationProvider>,
    );
    const usernameInput = screen.queryByLabelText(usernameLabel);
    userEvent.type(usernameInput, user);

    const pwdInput = screen.queryByLabelText(pwdLabel);
    userEvent.type(pwdInput, pwd);

    const loginButton = screen.queryByText(loginBtn);
    await waitFor(() => {
      fireEvent.click(loginButton);
    });

    expect(mockedLogin).toHaveBeenCalledTimes(1);
    expect(props.saveToken).toHaveBeenCalledTimes(1);
  });
});
