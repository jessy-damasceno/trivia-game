import { SET_PLAYER } from '../actions';

const INITIAL_STATE = {
  name: 'Juninho', // nome-da-pessoa
  assertions: 0, // número-de-acertos
  score: 0, // pontuação
  gravatarEmail: 'juninho@email.com', // email-da-pessoa
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_PLAYER:
    return {
      ...state,
      name: action.name,
      gravatarEmail: action.email,
    };

  default:
    return state;
  }
};

export default player;
