import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import React from 'react';
import { screen } from '@testing-library/react';
import App from "../App";
import userEvent from "@testing-library/user-event";
import { setRanking } from "../services/rankingStorage";

const MOCK_PLAYER = {
  player: {
    name: 'Juninho Motoqueiro',
    gravatarEmail: 'ewqe@gn.com',
    assertions: 4,
    score: 100,
  }
};

const RESET_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

describe('3. Teste da página de Ranking', () => {

  it('Teste se a página é renderizada corretamente', () => {
    renderWithRouterAndRedux(<App />, MOCK_PLAYER, '/ranking');

    expect(screen.getByText('Ranking')).toBeInTheDocument()
  });

  it('Teste se o botão "Voltar ao início" funciona corretamente', () => {
    const { history, store } = renderWithRouterAndRedux(<App />, MOCK_PLAYER, '/ranking');

    const goHomeButton = screen.getByTestId('btn-go-home');

    expect(goHomeButton).toBeInTheDocument();
    expect(goHomeButton).toHaveTextContent(/^voltar ao início$/i);

    userEvent.click(goHomeButton);

    expect(store.getState().player).toStrictEqual(RESET_STATE);
    expect(history.location.pathname).toBe('/');
  });

  it('Teste se o histórico de partidas foi renderizado corretamente', () => {
    const { history, store } = renderWithRouterAndRedux(<App />, MOCK_PLAYER);

    setRanking({
      name: MOCK_PLAYER.player.name,
      score: MOCK_PLAYER.player.score,
      picture: MOCK_PLAYER.player.gravatarEmail,
    });

    history.push('/ranking');

    const playersName = screen.getAllByTestId(/^player-name-/i);
    const playersScore = screen.getAllByTestId(/^player-score-/i);
    const playerImg = screen.getByAltText('Juninho Motoqueiro');

    expect(playersName[0]).toHaveTextContent(MOCK_PLAYER.player.name);
    expect(playersScore[0]).toHaveTextContent(MOCK_PLAYER.player.score);
    expect(playerImg).toHaveProperty('src', 'https://www.gravatar.com/avatar/b60b5722c5c71e5ebfabf249fe5afc04');
  });
});
