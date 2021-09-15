import { useEffect } from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '../api/useAuth';

export const useRequireAuth = (redirectUrl = '/login') => {
  const auth = useAuth();
  const history = useHistory();

  useEffect(() => {
    if (auth.user === false) {
      history.push(redirectUrl);
    }
  }, [auth]);

  return auth;
};
