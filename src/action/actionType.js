export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

// action creators
export const login = (name, id) => ({
  type: LOGIN,
  payload: { name, id }
});

export const logout = () => ({
  type: LOGOUT
});
