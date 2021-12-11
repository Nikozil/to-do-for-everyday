import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { selectAuthStatus } from '../Redux/selectors/userSelector';

export const useRequireAuth = (redirectUrl = '/login') => {
  const [firstPath, setFirstPath] = useState('/');

  const pathname = useLocation().pathname;

  const authStatus = useSelector(selectAuthStatus);

  const history = useHistory();

  useEffect(() => {
    if (!authStatus) {
      if (pathname !== redirectUrl) setFirstPath(pathname);
      history.push(redirectUrl);
    }

    if (authStatus && pathname === redirectUrl) history.push(firstPath);
  }, [authStatus, redirectUrl, pathname, history, firstPath]);

  return authStatus;
};
