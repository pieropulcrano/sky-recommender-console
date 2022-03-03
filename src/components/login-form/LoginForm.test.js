import React from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from './LoginForm';

describe('Login Form', () => {
  let props;
  const loginBtn = 'Login';
  const usernameLabel = 'Username';
  const pwdLabel = 'Password';
  const user = 'test';
  const pwd = 'test';

  beforeEach(() => {
    props = {
      onSubmit: jest.fn(),
      isSubmitting: false,
    };
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render', () => {
    render(
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <LoginForm {...props} />
      </LocalizationProvider>,
    );
    expect(document.body.childNodes[0].children).toMatchSnapshot();
  });

  describe('should not submit', () => {
    it('if is empty', async () => {
      render(
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <LoginForm {...props} />
        </LocalizationProvider>,
      );

      const logineButton = screen.queryByText(loginBtn);
      await waitFor(() => fireEvent.click(logineButton));

      expect(props.onSubmit).not.toHaveBeenCalled();
    });
  });

  describe('should submit', () => {
    it("if is'nt empty", async () => {
      render(
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <LoginForm {...props} />
        </LocalizationProvider>,
      );
      const usernameInput = screen.queryByLabelText(usernameLabel);
      userEvent.type(usernameInput, user);

      const pwdInput = screen.queryByLabelText(pwdLabel);
      userEvent.type(pwdInput, pwd);

      const logineButton = screen.queryByText(loginBtn);
      await waitFor(() => fireEvent.click(logineButton));

      await waitFor(() => {
        expect(props.onSubmit).toHaveBeenCalledTimes(1);
        expect(props.onSubmit).toHaveBeenCalledWith({
          user_name: user,
          password: pwd,
        });
      });
    });
  });
});
