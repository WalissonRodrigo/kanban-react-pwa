/* eslint-disable react/prop-types */
import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { authAtom } from '../../store/_state/auth';

export const ProtectedRoute = (props: PropsWithChildren) => {
  const { children } = props;
  const auth = useRecoilValue(authAtom);
  if (!auth?.token) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return children;
};
