/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { authAtom } from '../_state';

export { useFetchWrapper };

function useFetchWrapper() {
  const [auth, setAuth] = useRecoilState(authAtom);
  const navigate = useNavigate();
  return {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    delete: request('DELETE'),
  };

  function request(method: any) {
    return (url: any, body: any) => {
      const requestOptions: any = {
        method,
        headers: authHeader(url),
      };
      requestOptions.headers['Content-Type'] = 'application/json';
      if (body) {
        requestOptions.body = JSON.stringify(body);
      }
      return fetch(url, requestOptions).then(handleResponse);
    };
  }

  // helper functions

  function authHeader(url: string) {
    // return auth header with jwt if user is logged in and request is to the api url
    const token = auth?.token || '';
    const isLoggedIn = !!token;
    const isApiUrl =
      url.startsWith('http://localhost:5000') || url.startsWith('http://0.0.0.0:5000');
    if (isLoggedIn && isApiUrl) {
      return { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };
    } else {
      return { 'Content-Type': 'application/json' };
    }
  }

  function handleResponse(response: any) {
    return response.text().then((text: string) => {
      const data = text && JSON.parse(text);

      if (!response.ok) {
        if ([401, 403].includes(response.status) && auth?.token) {
          // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
          localStorage.removeItem('user');
          setAuth(null);
          navigate('/login', { replace: true });
        }

        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
      }

      return data;
    });
  }
}
