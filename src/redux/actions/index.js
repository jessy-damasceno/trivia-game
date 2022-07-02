export const SET_PLAYER = 'SET_PLAYER';
export const SET_SCORE = 'SET_SCORE';
export const RESET = 'RESET';

export const setPlayer = (name, email) => ({
  type: SET_PLAYER,
  name,
  email,
});

export const setScore = (score) => ({
  type: SET_SCORE,
  score,
});

export const setReset = () => ({
  type: RESET,
});
