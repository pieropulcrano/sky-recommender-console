import { useEffect, useState } from 'react';

export default function useToken() {
  const [token, setToken] = useState();

  useEffect(() => {
    const timeoutConnection = setInterval(() => {
      setToken(undefined);
    }, 7200000);
    return () => clearInterval(timeoutConnection);
  }, [setToken]);

  const saveToken = (userToken) => {
    setToken(userToken);
  };

  const removeToken = () => {
    setToken(undefined);
  };
  return {
    saveToken: saveToken,
    removeToken: removeToken,
    token,
  };
}
