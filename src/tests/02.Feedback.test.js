import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import React from 'react';
import { screen } from '@testing-library/react';
import App from "../App";
import userEvent from "@testing-library/user-event";

const MOCK_PLAYER = {
  player: {
    name: 'Juninho Motoqueiro',
    gravatarEmail: 'juninhodamoto@trybe.com',
    assertions: 4,
    score: 100,
  }
}
describe('2. Teste da página de feedback', () => {
  
  it('Teste se as informações da partida foram renderizadas corretamente', () => {
    renderWithRouterAndRedux(<App />, MOCK_PLAYER, '/feedback');

    const score = screen.getByTestId('feedback-total-score');
    const assertions = screen.getByTestId('feedback-total-question');
    const feedbackText = screen.getByTestId('feedback-text');

    expect(feedbackText).toBeInTheDocument();

    expect(feedbackText).toHaveTextContent('Well Done!');
    expect(feedbackText).not.toHaveTextContent('Could be better...');
  });

  it('Teste se a tela é redirecionada corretamente ao clicar no botão Play again', () => {
    const { history } = renderWithRouterAndRedux(<App />, MOCK_PLAYER, '/feedback');

    userEvent.click(screen.getByTestId('btn-play-again'));
    expect(history.location.pathname).toBe('/');
  });

  it('Teste se a tela é redirecionada para a tela de ranking ao clicar no botão', () => {
    const { history } = renderWithRouterAndRedux(<App />, MOCK_PLAYER, '/feedback');

    userEvent.click(screen.getByTestId('btn-ranking'));
    expect(history.location.pathname).toBe('/ranking');
  });

  it('Teste se o texto do feedback é renderizado corretamente', () => {
    MOCK_PLAYER.player.assertions = 1;
    renderWithRouterAndRedux(<App />, MOCK_PLAYER, '/feedback');

    expect(screen.getByText(/Could be better/i)).toBeInTheDocument();
  });
})
