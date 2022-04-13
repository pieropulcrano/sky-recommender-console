import { useEffect, useState } from 'react';
import { logoutUser } from '../providers/auth-provider/AuthProvider';
export default function useToken() {
  const getToken = () => {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken;
  };

  const [token, setToken] = useState(getToken());

  const saveTokenL = (userToken) => {
    sessionStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken.token);
  };
  useEffect(() => {
    const timeoutConnection = setInterval(() => {
      setToken(undefined);
    }, 7200000);
    return () => clearInterval(timeoutConnection);
  }, [setToken]);

  const removeToken = async () => {
    await logoutUser(token);
    sessionStorage.removeItem('token');
    setToken(undefined);
  };
  return {
    saveToken: saveTokenL,
    removeToken: removeToken,
    token,
  };
}
