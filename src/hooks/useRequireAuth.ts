import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { AppStateType } from '../Redux/store';

export const useRequireAuth = (redirectUrl = '/login') => {
  const user = useSelector((state: AppStateType) => state.user.user);
  const history = useHistory();
  useEffect(() => {
    if (user === false) {
      history.push(redirectUrl);
    }
    if (user) {
      history.push('/');
    }
  }, [user]);

  return user;
};
