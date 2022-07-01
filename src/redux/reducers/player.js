import { SET_PLAYER, SET_SCORE } from '../actions';

const INITIAL_STATE = {
  name: '', // nome-da-pessoa
  assertions: 0, // número-de-acertos
  score: 0, // pontuação
  gravatarEmail: '', // email-da-pessoa
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_PLAYER:
    return {
      ...state,
      name: action.name,
      gravatarEmail: action.email,
    };

  case SET_SCORE:
    return {
      ...state,
      score: state.score + action.score,
      assertions: state.assertions + 1,
    };

  default:
    return state;
  }
};

export default player;
