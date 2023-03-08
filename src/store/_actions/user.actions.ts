/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable react-hooks/rules-of-hooks */

/* eslint-disable no-unsafe-optional-chaining */
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { AES } from 'crypto-js';

import { useFetchWrapper } from '../_helpers';
import { authAtom, usersAtom } from '../_state';

export { useUserActions };

function useUserActions() {
  const navigate = useNavigate();
  const baseUrl = `http://localhost:5000`;
  const fetchWrapper = useFetchWrapper();
  const [auth, setAuth] = useRecoilState(authAtom);
  // const setAuth = useSetRecoilState(authAtom);
  const setUsers = useSetRecoilState(usersAtom);

  return {
    login,
    logout,
    getAll,
    reAuthenticate,
  };

  function login(username: string, password: string) {
    return fetchWrapper.post(`${baseUrl}/login`, { username, password }).then((token) => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      const userEncrypted = AES.encrypt(
        JSON.stringify({ username, password }),
        '5909aaee-5d40-46d4-bf4a-e38314a77827',
      ).toString();
      const auth = {
        token: token.access_token,
        user: userEncrypted,
      };
      localStorage.setItem('user', JSON.stringify(auth));
      setAuth({
        token: token.access_token,
        user: { username, password },
      });
      // get return url from location state or default to home page
      navigate('/', { replace: true });
    });
  }

  function reAuthenticate() {
    const { username, password } = auth?.user;
    return fetchWrapper.post(`${baseUrl}/login`, { username, password }).then((token) => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      const userEncrypted = AES.encrypt(
        JSON.stringify({ username, password }),
        '5909aaee-5d40-46d4-bf4a-e38314a77827',
      ).toString();
      const authenticated = {
        token: token.access_token,
        user: userEncrypted,
      };
      localStorage.setItem('user', JSON.stringify(authenticated));
      setAuth({
        token: token.access_token,
        user: { username, password },
      });
    });
  }

  function logout() {
    // remove user from local storage, set auth state to null and redirect to login page
    localStorage.removeItem('user');
    setAuth({});
    navigate('/login', { replace: true });
  }

  function getAll() {
    return fetchWrapper.get(`${baseUrl}/users`, {}).then(setUsers);
  }
}
