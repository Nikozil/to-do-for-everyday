import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { AppStateType } from '../Redux/store';

export const useRequireAuth = (redirectUrl = '/login') => {
  const pathname = useLocation().pathname;
  const user = useSelector((state: AppStateType) => state.user.user);
  const history = useHistory();
  useEffect(() => {
    if (user === false) history.push(redirectUrl);

    if (user && pathname === redirectUrl) history.push('/');
  }, [user, redirectUrl, history, pathname]);

  return user;
};
