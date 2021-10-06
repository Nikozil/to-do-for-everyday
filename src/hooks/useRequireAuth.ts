import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { AppStateType } from '../Redux/store';

export const useRequireAuth = (redirectUrl = '/login') => {
  const pathname = useLocation().pathname;
  const authStatus = useSelector(
    (state: AppStateType) => state.user.authStatus
  );
  const history = useHistory();
  useEffect(() => {
    if (!authStatus) history.push(redirectUrl);

    if (authStatus && pathname === redirectUrl) history.push('/');
  }, [authStatus, redirectUrl, history, pathname]);

  return authStatus;
};
