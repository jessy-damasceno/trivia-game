import { SET_PLAYER, SET_SCORE, RESET } from '../actions';

const INITIAL_STATE = {
  name: '', // nome-da-pessoa
  assertions: 0, // número-de-acertos
  score: 0, // pontuação
  gravatarEmail: '',
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

  case RESET:
    return {
      ...INITIAL_STATE,
    };

  default:
    return state;
  }
};

export default player;
