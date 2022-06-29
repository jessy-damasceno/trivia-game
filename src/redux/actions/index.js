export const SET_PLAYER = 'SET_PLAYER';

export const setPlayer = (name, email) => ({
  type: SET_PLAYER,
  name,
  email,
});
