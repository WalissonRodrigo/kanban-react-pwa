/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { authAtom } from '../../store/_state/auth';

export const ProtectedRoute = ({ children }) => {
  const auth = useRecoilValue(authAtom);
  if (!auth.token) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return children;
};
