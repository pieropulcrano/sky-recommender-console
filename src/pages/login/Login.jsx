import React from 'react';
import PropTypes from 'prop-types';
import useNotification from '../../hooks/useNotification';
import LoginForm from '../../components/form/login-form/LoginForm';
import { loginUser } from '../../providers/auth-provider/AuthProvider';

const Login = ({ saveToken }) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { addAlert } = useNotification();

  const onSubmit = React.useCallback(
    async (values) => {
      setIsSubmitting(true);
      try {
        const token = await loginUser({
          ...values,
        });
        setIsSubmitting(false);
        saveToken(token);
      } catch (error) {
        setIsSubmitting(false);
        addAlert({
          text: 'Password or Username are not valid',
          title: `Login Error`,
          type: 'error',
          id: Date.now(),
        });
      }
    },
    [saveToken, addAlert],
  );

  return <LoginForm onSubmit={onSubmit} isSubmitting={isSubmitting} />;
};
Login.propTypes = {
  saveToken: PropTypes.func.isRequired,
};

export default Login;
