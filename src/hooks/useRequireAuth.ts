import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { selectAuthStatus } from '../Redux/selectors/userSelector';

export const useRequireAuth = (redirectUrl: string, exceptionUrl: string[]) => {
  const [firstPath, setFirstPath] = useState('/');

  const pathname = useLocation().pathname;

  const authStatus = useSelector(selectAuthStatus);

  const history = useHistory();

  const isExceptionPath = exceptionUrl.includes(pathname);

  useEffect(() => {
    if (!authStatus && !isExceptionPath) {
      if (pathname !== redirectUrl) setFirstPath(pathname);
      history.push(redirectUrl);
    }

    if (authStatus && (pathname === redirectUrl || isExceptionPath))
      history.push(firstPath);
  }, [authStatus, redirectUrl, pathname, history, firstPath, isExceptionPath]);

  return authStatus;
};
