import { FC } from 'react';

const doLogIn = (username: string, password: string) => {
  localStorage.setItem('user', JSON.stringify({ username, password }));
  localStorage.setItem('isLoggedIn', true);
};

const isLoggedIn = () => {
  return Boolean(localStorage.getItem('isLoggedIn'));
};

const logOut = (props: FC) => {
  localStorage.removeItem('user');
  localStorage.removeItem('isLoggedIn');
  // props.history.push('/login');
};

export default {
  doLogIn,
  isLoggedIn,
  logOut,
};
